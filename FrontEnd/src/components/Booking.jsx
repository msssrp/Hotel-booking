import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function Booking() {
  const [getRoomdata, setGetRoomdata] = useState([]);
  const navigate = useNavigate();
  const [loaded , setLoaded] = useState(null)
  useEffect(() => {
    if(!document.cookie){
      return navigate('/sign-in')
    }
    axios
      .get("http://localhost:5000/AllroomData")
      .then((res) => {
        setGetRoomdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      setLoaded(!loaded)
  }, []);

  return (

    <>
    {loaded && getRoomdata.length > 0 ? (
      <>
      <Navbar />

      <div className="md:container md:mx-auto font-Inter">
        <div className="Hotel-cardfont-Inter grid grid-cols-4">
          {getRoomdata.map((val) => {
            return (
              <div className="card-container ml-[40px] mr-[100px] mt-[130px] w-[330px] h-[430px] border  rounded-xl">
                <div className="img-hotel w-[100%] h-[250px] border rounded-xl">
                  <img
                    src={`data:image/jpeg;base64,${val.image}`}
                    className="h-full w-full rounded-xl"
                    alt="Room View"
                  />
                </div>
                <div className="hotel-name">
                  <p className="mt-[15px] mb-[5px] pl-[15px] text-[20px] font-semibold">
                    {val.r_room}
                  </p>
                  <p className="mb-[5px] pl-[15px] text-[#3E6CEA]">
                    {val.r_type}
                  </p>
                  <p className="mb-[5px] pl-[15px]">{val.r_reviews} reviews</p>
                  <p className="mb-[5px] pl-[15px]">{val.r_price} B / night</p>
                  <div className="mt-[10px]">
                  <Link
                    to={{pathname:`/book-room/${val.r_id}`}}
                    className="ml-[15px]  text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Book
                  </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>


      <Footer />
      </>
    ) : null}
      
    </>
  );
}

export default Booking;
