const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const secret = "asd/zx,dqpwodk/zx,xzpdkaSDasd-q=d=-2o=-1=-od";
const bcrypt = require("bcrypt");
const saltRounds = 10;
const port = 5000;
const multer = require("multer");
const moment = require('moment')


const upload = multer();

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "Localhost",
  user: "root",
  password: "",
  database: "hotel-project",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("db connect");
  }
});

app.post("/register", (req, res) => {
  const { firstName, lastName, phoneNumber, email, password } = req.body;
 

  
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return res.json({ status: "error", msg: "error" });
    }
    db.query(
      "SELECT u_email FROM h_user WHERE u_email = ?",
      [email],
      (err, result) => {
        if (result.length === 1) {
          res.json({
            status: "error",
            msg: "This email already in use please create at another email",
          });
          console.log("email in use");
        } else {
          db.query(
            "INSERT INTO h_user (u_firstName , u_lastName , u_phone , u_email , u_password) VALUES (?,?,?,?,?)",
            [firstName, lastName, phoneNumber, email, hash],
            (err, result) => {
              if (err) {
                res.json({ status: "error", msg: { err } });
              } else {
                res.json({ status: "success", msg: "Created!!" });
                console.log("inserted");
              }
            }
          );
        }
      }
    );
  });
});

app.post("/register-admin", (req, res) => {
  const { firstName, lastName, phoneNumber, email, password } = req.body;


  
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return res.json({ status: "error", msg: "error" });
    }
    db.query(
      "SELECT u_email FROM h_user WHERE u_email = ?",
      [email],
      (err, result) => {
        if (result.length === 1) {
          res.json({
            status: "error",
            msg: "This email already in use please create at another email",
          });
          console.log("email in use");
        } else {
          db.query(
            "INSERT INTO h_user (u_firstName , u_lastName , u_phone , u_email , u_password , u_role) VALUES (?,?,?,?,?,'admin')",
            [firstName, lastName, phoneNumber, email, hash],
            (err, result) => {
              if (err) {
                res.json({ status: "error", msg: { err } });
                console.log(err);
              } else {
                res.json({ status: "success", msg: "Created!!" });
                console.log("inserted");
              }
            }
          );
        }
      }
    );
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM h_user WHERE u_email = ?", [email], (err, h_user) => {
    if (h_user.length == 0) {
      return res.json({ status: "error", msg: "Invalid email" });
    }
    bcrypt.compare(password, h_user[0].u_password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { id: h_user[0].u_id, role: h_user[0].u_role },
          secret,
          { expiresIn: "1hr" }
        );
        res.json({ status: "success", msg: "login", token });
      } else {
        res.json({ status: "error", msg: "invalid password" });
      }
    });
  });
});

app.post("/auth", (req, res) => {
  if (!req.headers.authorization) {
    return res.json({ status: "error", msg: "No token" });
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decode = jwt.verify(token, secret);
    if (decode.role === "admin") {
      res.json({ status: "success", role: "admin", msg: "Match", decode });
    } else {
      res.json({
        status: "success",
        role: "Notadmin",
        msg: "user is not admin",
        decode,
      });
    }
  } catch (error) {
    res.json({ status: "error", msg: { error } });
  }
});

app.post("/user", (req, res) => {
  const id = req.body.u_id;

  db.query(
    "SELECT u_email,u_firstName,u_lastName,u_phone FROM h_user WHERE u_id = ?",
    [id],
    (err, result) => {
      if (result) {
        return res.json({ status: "success", msg: "get all", result });
      }
    }
  );
});



app.get("/userData", (req, res) => {
  db.query(
    "SELECT h_booking.b_id, h_user.u_firstName, h_room.r_room, h_booking.b_price, h_booking.b_startDate,h_booking.b_endDate, h_booking.b_status FROM h_booking INNER JOIN h_user ON h_booking.u_id = h_user.u_id INNER JOIN h_room ON h_booking.r_id = h_room.r_id;",
    (err, result) => {
      if (err) {
        res.json({ status: "error", msg: { err } });
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/countStatus", (req, res) => {
  db.query(
    "SELECT COUNT(CASE WHEN b_status = 'Available' THEN 1 ELSE null end) AS availableCount,COUNT(CASE WHEN b_status = 'Pending' THEN 1 ELSE null END) AS pendingCount,COUNT(CASE WHEN b_status = 'Booked' THEN 1 ELSE null END)AS bookedCount FROM h_booking",
    (err, result) => {
      if (err) {
        res.json({ status: "error", msg: { err } });
      } else [res.send(result)];
    }
  );
});

app.get("/countUser", (req, res) => {
  db.query(
    "SELECT COUNT(case WHEN u_role !='admin' THEN 1 else null end) as userCount FROM h_user;",
    (err, result) => {
      if (err) {
        res.json({ status: "error", msg: { err } });
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/sumTotal", (req, res) => {
  db.query("SELECT SUM(b_price) as total FROM h_booking", (err, result) => {
    if (err) {
      res.json({ status: "error" });
    } else [res.send(result)];
  });
});

app.get("/userAllData", (req, res) => {
  db.query(
    "SELECT u_id,u_firstName , u_lastName , u_phone , u_email FROM h_user WHERE u_role != 'admin'",
    (err, result) => {
      if (err) {
        res.json({ status: "error", msg: { err } });
      } else {
        res.send(result);
      }
    }
  );
});

app.get('/adminData',(req,res)=>{
  db.query("SELECT u_id , u_firstName , u_lastName ,u_phone , u_email FROM h_user WHERE u_role = 'admin'",(err,result)=>{
    if(err){
      res.json({status:'error',msg:{err}})
    }else{
      res.send(result)
    }
  })
})


app.post('/booking-room',(req,res)=>{
  const roomid = req.body.roomid
  const userid = req.body.userid
  const name = req.body.name
  const lname = req.body.lname
  const guest = req.body.guest
  const startDate = req.body.startDate
  const endDate = req.body.endDate

  const startDateFormat = moment(startDate,'M/D/YYYY').format('YYYY/MM/DD') 
  const endDateFormat = moment(endDate,'M/D/YYYY').format('YYYY/MM/DD') 


  db.query("INSERT INTO h_booking (r_id, u_id, b_startDate, b_endDate, b_guest, b_name, b_lname, b_paid,b_status) VALUES (?, ?, ?, ?, ?, ?, ?, 'No','Pending')", [roomid, userid, startDateFormat, endDateFormat, guest, name, lname], (err, result) => {
    if(err) {
      res.json({status:"error",msg:{err}});
      console.log(err);
    } else {
      db.query("UPDATE h_room SET r_status='Pending' WHERE r_id=?", [roomid], (err, result) => {
        if(err) {
          res.json({status:"error",msg:{err}});
          console.log(err);
        } else {
          res.json({status:'success',msg:"Booked"});
          console.log('booked');
        }
      });
    }
});

  
})

app.post('/upload-img',upload.single('file'),(req,res)=>{
  const roomNumber = req.body.roomNumber
  const roomType = req.body.roomType
  const roomPrice = req.body.roomPrice
  const roomFileName = req.file.originalname
  const file = req.file.buffer
  db.query("INSERT INTO h_room (r_room,r_type,r_price,r_filename,r_data) VALUES (?,?,?,?,?)",[roomNumber,roomType,roomPrice,roomFileName,file],(err,result)=>{
    if(err){
      res.json({status:'error',msg:{err}})
      console.log(err);
    }else{
      res.json({status:'success',msg:'inserted'})
      console.log('inserted img');
    }
  })
})

app.put('/update-room', upload.single('file'), (req, res) => {
  const id = req.body.id
  let roomNumber = null
  let roomType = null
  let roomPrice = null
  let status = null
  let roomFileName = null
  let file = null
  
  if (req.file) {
    roomFileName = req.file.originalname
    file = req.file.buffer
  }

  if(req.body.roomNumber){
    roomNumber = req.body.roomNumber
  }
  if(req.body.roomType){
    roomType = req.body.roomType
  }
  if(req.body.roomPrice){
    roomPrice = req.body.roomPrice
  }
  if(req.body.status){
    status = req.body.status
  }

 
  
  db.query('SELECT * FROM h_room WHERE r_id = ?', [id], (err, result) => {
    if (err) {
      res.json({ status: 'error', msg: err })
      console.log(err)
    } else {
      const latestroomNumber = result[0].r_room
      const latestroomType = result[0].r_type
      const latestroomPrice = result[0].r_price
      const latestFileName = result[0].r_filename
      const latestData = result[0].r_data      
      const latestStatus = result[0].r_status
      if (!roomFileName) {
        roomFileName = latestFileName
        file = latestData
      }
      if(!roomNumber){
        roomNumber = latestroomNumber
      }
      if(!roomType){
        roomType = latestroomType
      }
      if(!roomPrice){
        roomPrice = latestroomPrice
      }
      if(!status){
        status = latestStatus
      }

      if(status === 'Available'){
        db.query("UPDATE h_booking SET b_status = 'Check Out' WHERE r_id = ?",[id],(err,result)=>{
          if(err){
            console.log(err);
          }else{
            console.log('b_status updated');
          }
        })
      }
      
      db.query('UPDATE h_room SET r_room = ?, r_type = ?, r_price = ?, r_filename = ?, r_data = ?, r_status = ? WHERE r_id = ?', 
               [roomNumber, roomType, roomPrice, roomFileName, file, status, id], 
               (err, result) => {
                 if (err) {
                   res.json({ status: 'error', msg: err })
                   console.log(err,status)
                 } else {
                   res.json({ status: 'success', msg: 'Updated' })
                   console.log('Updated')
                 }
               })
               
    }
  })
})

app.put('/update-user',(req,res)=>{
  const id = req.body.id
  const u_firstName = req.body.u_firstName
  const u_lastName = req.body.u_lastName
  const u_phone = req.body.u_phone
  const u_email = req.body.u_email
 
  db.query("UPDATE h_user SET u_firstName = ? , u_lastName = ? , u_phone = ? , u_email = ? WHERE u_id = ? ",[u_firstName,u_lastName,u_phone,u_email,id],(err,result)=>{
    if(err){
      res.json({status:'error',msg:{err}})
      console.log(err);
    }else{
      res.json({status:'success',msg:'Updated'})
      console.log('update');
    }
  })
})

app.put('/update-admin',(req,res)=>{
  const id = req.body.id
  const admin_firstName = req.body.admin_firstName
  const admin_lastName = req.body.admin_lastName
  const admin_phone = req.body.admin_phone
  const admin_email = req.body.admin_email

  db.query("UPDATE h_user SET u_firstName = ? , u_lastName = ? , u_phone = ? , u_email = ? WHERE u_id = ? ",[admin_firstName,admin_lastName,admin_phone,admin_email,id],(err,result)=>{
    if(err){
      res.json({status:'error',msg:{err}})
    }else{
      res.json({status:'success',msg:"Updated"})
      console.log('update');
    }
  })
})

app.put('/update-booking',(req,res)=>{
  const id = req.body.id
  const status = req.body.status
  

  db.query('UPDATE h_booking b JOIN h_room r ON b.r_id = r.r_id SET b.b_status = ?, r.r_status = ? WHERE b.b_id = ?', [status, status, id], (err, result) => {
    if (err) {
      res.json({status:'error',msg:{err}})
    } else {
      res.json({status:'success',msg:'Updated'})
    }
  })
})


app.put('/admin-change-password',(req,res)=>{
  const id = req.body.id
  const password = req.body.password

  bcrypt.hash(password,saltRounds,(err,hash)=>{
    if(err){
      return res.json({status:'error',msg:{err}})
    }
    db.query("UPDATE h_user SET u_password = ? WHERE u_id = ?",[hash,id],(err,result)=>{
      if(err){
        res.json({status:'error',msg:{err}})
      }else{
        res.json({status:'success',msg:"Password Changed"})
      }
    })
  })
})

app.get('/show-img/:id',(req,res)=>{
  
  const id = req.params.id


  db.query("SELECT r_data FROM h_room WHERE r_id = ?",id,(err,result)=>{
    if(err){
      res.json({status:'error',msg:{err}})
    }else{
      const image = result[0].r_data.toString('base64')
      res.send(image)
      console.log('sended');
    }
  })
})

app.get('/AllroomData',(req,res)=>{
  db.query("SELECT * FROM h_room",(err,result)=>{
    if(err){
      res.json({status:'error',msg:{err}})
    }else{
      const rooms = result.map(row=>({
        r_id : row.r_id,
        r_room:row.r_room,
        r_type:row.r_type,
        r_price:row.r_price,
        r_reviews:row.r_reviews,
        image : row.r_data.toString('base64')
      }));
      res.send(rooms);
      console.log('sended');
    }
  })
})

app.get('/Room-Reviews',(req,res)=>{
  db.query("SELECT * FROM h_room WHERE r_reviews > 0",(err,result)=>{
    if(err){
      res.json({status:'error',msg:{err}})
    }else{
      const rooms = result.map(row=>({
        r_id : row.r_id,
        r_room:row.r_room,
        r_type:row.r_type,
        r_price:row.r_price,
        r_reviews:row.r_reviews,
        image : row.r_data.toString('base64')
      }));
      res.send(rooms);
      console.log('sended');
    }
  })
})

app.get('/roomData' ,(req,res)=>{
  db.query("SELECT * FROM h_room",(err,result)=>{
    if(err){
      res.json({status:"error",msg:{err}})
    }else{
      res.send(result)
    }
  })
})


app.get('/roomdata/:id',(req,res)=>{

  const id = req.params.id

  db.query("SELECT * FROM h_room WHERE r_id = ?",id,(err,result)=>{
    if(err){
      res.json({status:'error',msg:{err}})
    }else{
      const rooms = result.map(row=>({
        r_id : row.r_id,
        r_room:row.r_room,
        r_type:row.r_type,
        r_price:row.r_price,
        r_reviews:row.r_reviews,
        image : row.r_data.toString('base64')
      }));
      res.send(rooms);
      console.log('sended');
    }
  })
})

app.get('/booked-total/:id',(req,res)=>{

  const id = req.params.id
  

  db.query("SELECT h_booking.b_id, h_booking.r_id, h_user.u_firstName, h_user.u_lastName,h_room.r_room, h_room.r_type, h_room.r_price,h_booking.b_status,h_booking.b_guest,DATEDIFF(h_booking.b_endDate, h_booking.b_startDate) AS duration,DATEDIFF(h_booking.b_endDate, h_booking.b_startDate) * h_room.r_price AS total_cost FROM  h_booking  JOIN h_room ON h_booking.r_id = h_room.r_id  JOIN h_user ON h_booking.u_id = h_user.u_id WHERE  h_booking.u_id = ?",id,(err,result)=>{
    if(err){
      console.log(err);
    }else{
      res.send(result)
    }
  })
})


app.put('/booking-confirm/:id',(req,res)=>{
  const id = req.params.id
  const total = req.body.totalPrice
  
  db.query("UPDATE h_booking INNER JOIN h_room ON h_booking.r_id = h_room.r_id SET h_booking.b_paid = 'Yes', h_booking.b_status = 'Booked', h_room.r_status = 'Booked' , h_booking.b_price = ? WHERE h_booking.b_id = ?",[total,id],(err,result)=>{
    if(err){
      res.json({status:'error',msg:{err}})
    }else{
      res.json({status:'success',msg:"Success"})
    }
  })
})

app.delete('/delete-room/:id',(req,res)=>{
  const id = req.params.id

  db.query('DELETE FROM h_room WHERE r_id = ?',id,(err,result)=>{
    if(err){
      res.json({status:'error',msg:{err}})
      console.log(err);
    }else[
      res.json({status:'success',msg:'Deleted'})
    ]
  })
})

app.delete('/delete-user/:id',(req,res)=>{
  const id = req.params.id

  db.query('DELETE FROM h_user WHERE u_id = ?',id,(err,result)=>{
    if(err){
      res.json({status:'error',msg:{err}})
    }else{
      res.json({status:'success',msg:'Deleted'})
    }
  })
})

app.delete('/delete-booking/:id',(req,res)=>{
  const id = req.params.id
  
  db.beginTransaction(function(err) {
    if (err) { throw err; }
    db.query('SELECT r_id FROM h_booking WHERE b_id = ?', [id], function(error, results, fields) {
      if (error) {
        return db.rollback(function() {
          throw error;
        });
      }
  
      const r_id = results[0].r_id;
  
      db.query('UPDATE h_room SET r_status = ? WHERE r_id = ?', ['Available', r_id], function(error, results, fields) {
        if (error) {
          return db.rollback(function() {
            throw error;
          });
        }
  
        db.query('DELETE FROM h_booking WHERE b_id = ?', [id], function(error, results, fields) {
          if (error) {
            return db.rollback(function() {
              throw error;
            });
          }
          db.commit(function(err) {
            if (err) {
              return db.rollback(function() {
                throw err;
              });
            }
            console.log('Transaction completed successfully.');
            res.json({status: 'success', msg: 'Booking canceled.'});
          });
        });
      });
    });
  });
  
})





app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`connect on ${port}`);
  }
});
