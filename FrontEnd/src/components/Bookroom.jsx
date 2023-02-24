import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Datepicker from "react-tailwindcss-datepicker";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Bookroom() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [roomdata, setRoomdata] = useState([]);

  const userId = localStorage.getItem('u_id')

  const dateConvert = (date) =>{
    return new Date(date).toLocaleDateString("en-US")
  }
  
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

 
  const handleValueChange = (newValue) => {
    const newStartDate = dateConvert(newValue.startDate);
    const newEndDate = dateConvert(newValue.endDate);
  

    
    setBookdata((prev) => ({
      ...prev,
      startDate: newStartDate,
      endDate: newEndDate,
    }));
  
    setValue(newValue);
  };

  const handleOnchange = (e) =>{
    const {name , value } = e.target

    setBookdata((prev)=>({
      ...prev,[name]:value
    }))
  }


  const [bookdata , setBookdata] = useState({
    roomid :id,
    userid:userId,
    name :'',
    lname:'',
    guest:'',
    startDate:dateConvert(value.startDate),
    endDate:dateConvert(value.endDate)
  })  

  


  const handleOnsubmit = (e) =>{
    e.preventDefault()

    

    axios.post('http://localhost:5000/booking-room',bookdata).then(res=>{
      if(res.data.status === 'success'){
        toast.success(`${res.data.msg}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          
        },);
        
      }else{
        toast.error(`${res.data.msg}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    })
  }

  useEffect(() => {
    if (!document.cookie) {
      return navigate("/sign-in");
    }

    axios
      .get(`http://localhost:5000/roomdata/${id}`)
      .then((res) => {
        setRoomdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
     <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <Navbar />
      <div className="flex justify-center items-center mt-[6.25rem] font-Inter">
        <div className="w-[37.5rem]">
          <a className="cursor-pointer col-span-4">
            <div className="card-container  w-[500px] h-[480px] border  rounded-xl">
              {roomdata.map((val) => {
                return (
                  <>
                    <div className="img-hotel w-[100%] h-[350px] border rounded-xl">
                      <img
                        src={`data:image/jpeg;base64,${val.image}`}
                        className="h-full w-full rounded-xl"
                        alt="Room View"
                      />
                    </div>
                    <div className="hotel-name">
                      <p className="mt-[15px] mb-[5px] pl-[15px] text-[20px] font-semibold">Room {val.r_room}</p>
                      <p className="mb-[5px] pl-[15px] text-[#3E6CEA]">{val.r_type}</p>
                      <p className="mb-[5px] pl-[15px]">{val.r_price}B / night</p>
                      
                    </div>
                  </>
                );
              })}
            </div>
          </a>
        </div>
        <div className="SecTopic w-[500px] ">
          <div class="flex items-center justify-center p-12">
            <div class="mx-auto w-full max-w-[550px]">
              <form method="POST" onSubmit={handleOnsubmit}>
                <div class="-mx-3 flex flex-wrap">
                  <div class="w-full px-3 sm:w-1/2">
                    <div class="mb-5">
                      <label
                        for="name"
                        class="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleOnchange}
                        placeholder="First Name"
                        required
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                  <div class="w-full px-3 sm:w-1/2">
                    <div class="mb-5">
                      <label
                        for="lname"
                        class="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lname"
                        id="lname"
                        onChange={handleOnchange}
                        placeholder="Last Name"
                        required
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                </div>
                <div class="mb-5">
                  <label
                    for="guest"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    How many guest are you bringing?
                  </label>
                  <input
                    type="number"
                    name="guest"
                    id="guest"
                    onChange={handleOnchange}
                    placeholder="5"
                    min="0"
                    required
                    class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>

                <div className="pb-5">
                  <Datepicker
                    primaryColor={"white"}
                    value={value}
                    onChange={handleValueChange}
                  />
                </div>

                <div class="mb-5">
                  <label class="mb-3 block text-base font-medium text-[#07074D]">
                    Are you coming to the event?
                  </label>
                  <div class="flex items-center space-x-6">
                    <div class="flex items-center">
                      <input
                        type="radio"
                        name="radio1"
                        id="radioButton1"
                        class="h-5 w-5"
                      />
                      <label
                        for="radioButton1"
                        class="pl-3 text-base font-medium text-[#07074D]"
                      >
                        Yes
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input
                        type="radio"
                        name="radio1"
                        id="radioButton2"
                        class="h-5 w-5"
                      />
                      <label
                        for="radioButton2"
                        class="pl-3 text-base font-medium text-[#07074D]"
                      >
                        No
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Bookroom;
