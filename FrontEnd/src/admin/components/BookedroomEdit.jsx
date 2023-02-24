import React, { useEffect, useState } from "react";
import Navbaradmin from "./Navbaradmin";
import Sidebar from "./Sidebar";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import queryString from "query-string";
import axios from "axios";
function BookedroomEdit() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!document.cookie) {
      return navigate("sign-in");
    }
  }, []);

  const { id } = useParams();
  const location = useLocation();
  const { name, room, price, status, date } = queryString.parse(
    location.search
  );


  const [updateData , setUpdateData] = useState({
    id:id,
    status:''
  })

  

  const handleOnchange = (e) =>{
    const { name , value } = e.target

    setUpdateData((prev)=>({
        ...prev,[name]:value
    }))
  }

  const handleOnsubmit = (e) =>{
    e.preventDefault()

    axios.put('http://localhost:5000/update-booking',updateData).then(res=>{
        if(res.data.status === 'success'){
            toast.success(`${res.data.msg}`,{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
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
    }).catch(err=>{
        console.log(err);
    })
  }

 

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
      <Navbaradmin />
      <div className="flex mt-[80px]">
        <Sidebar />
        <main className="flex-1 h-screen">
          <div className="flex flex-col justify-center items-center h-full bg-[#F4F2F2] pt-[50px] pb-[50px]">
            <div class="w-full max-w-[550px] h-full bg-white">
              <form class="py-6 px-9" action="post" onSubmit={handleOnsubmit}>
                <div class="mb-5">
                  <label
                    for="id"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Booking ID
                  </label>
                  <input
                    type="text"
                    name="id"
                    id="id"
                    placeholder={id}
                    disabled
                    class="w-full  rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div class="mb-5">
                  <label
                    for="name"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder={name}
                    disabled
                    class="w-full  rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="mb-5">
                  <label
                    for="room"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Room
                  </label>
                  <input
                    type="text"
                    name="room"
                    id="room"
                    placeholder={room}
                    disabled
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div class="mb-5">
                  <label
                    for="price"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    placeholder={price}
                    disabled
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div class="mb-5">
                  <label
                    for="status"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Status Now {status}
                  </label>
                  <select name="status" onChange={handleOnchange} id="status" class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" >
                  <option selected={status} disabled>Change Status</option>
                   <option value='Pending'>Pending</option>
                    <option  value="Booked">Booked</option>
                  </select>
                </div>

                <div class="mb-5">
                  <label
                    for="date"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Date
                  </label>
                  <input
                    type="text"
                    name="date"
                    id="date"
                    value={date}
                    disabled
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>

                <div>
                  <button class="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none mt-[25px]">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default BookedroomEdit;
