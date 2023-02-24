import React, { useState, useEffect } from "react";
import {  Link } from "react-router-dom";
import axios from "axios";
import Navbaradmin from "./Navbaradmin";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function DashBoardStat() {
  

  const [getData, setGetData] = useState([]);

  const [status, setStatus] = useState([]);

  const [userCount, setUserCount] = useState([]);

  const [total, setTotal] = useState([]);

  const [fetch, setFetch] = useState(false);

  
  
  useEffect(() => {

    

    
    axios
      .get("http://localhost:5000/userData")
      .then((res) => {
        setGetData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

 

    axios
      .get("http://localhost:5000/countStatus")
      .then((res) => {
        setStatus(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      

    axios
      .get("http://localhost:5000/countUser")
      .then((res) => {
        setUserCount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      console.log(userCount);

    axios
      .get("http://localhost:5000/sumTotal")
      .then((res) => {
        setTotal(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      

    setFetch(!fetch);
   
  }, []);

  const handleDeleteRoom = (id) =>{
    axios.delete(`http://localhost:5000/delete-booking/${id}`).then(res=>{
      if(res.data.status === 'success'){
        toast.success(`${res.data.msg}`,{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          
        })
      }else{
        toast.error(`${res.data.msg}`,{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        console.log(res.data.msg);
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
        <Sidebar/>
        <main className="flex-1 h-screen">
          <div className="flex flex-col justify-center items-center h-full bg-[#F4F2F2]">
            {fetch &&
            status.length > 0 &&
            userCount.length > 0 &&
            total.length > 0 ? (
              <>
                {status.map((val) => {
                  return (
                    <div class="flex flex-col md:flex-row justify-center mt-[-100px] ml-[-90px]">
                      <div class="md:w-11/12">
                        <div class="flex md:flex-row space-x-8">
                          <div class="shadow-md p-4">
                            <div class="">
                              <div class="flex flex-col">
                                <div class="flex space-x-8 w-56">
                                  <div class="">
                                    <div class="uppercase text-sm text-gray-400">
                                      Users
                                    </div>
                                    <div class="mt-1">
                                      <div class="flex space-x-2 items-center">
                                        <div class="text-2xl">
                                          {userCount[0].userCount}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="">
                                    <svg
                                      class="h-16 w-20 text-gray-300"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="shadow-md p-4">
                            <div class="">
                              <div class="flex flex-col">
                                <div class="flex space-x-8 w-56">
                                  <div class="">
                                    <div class="uppercase text-sm text-gray-400">
                                      Rooms available
                                    </div>
                                    <div class="mt-1">
                                      <div class="flex space-x-2 items-center">
                                        <div class="text-2xl">
                                          {val.availableCount}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="">
                                    <svg
                                      class="h-16 w-20 text-gray-300"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="shadow-md p-4">
                            <div class="">
                              <div class="flex flex-col">
                                <div class="flex space-x-8 w-56">
                                  <div class="">
                                    <div class="uppercase text-sm text-gray-400">
                                      Pending
                                    </div>
                                    <div class="mt-1">
                                      <div class="flex space-x-2 items-center">
                                        <div class="text-2xl">
                                          {val.pendingCount}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="">
                                    <svg
                                      class="h-16 w-20 text-gray-300"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="shadow-md p-4">
                            <div class="">
                              <div class="flex flex-col">
                                <div class="flex space-x-8 w-56">
                                  <div class="">
                                    <div class="uppercase text-sm text-gray-400">
                                      Total
                                    </div>
                                    <div class="mt-1">
                                      <div class="flex space-x-2 items-center">
                                        <div class="text-2xl">
                                          {total[0].total}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="">
                                    <svg
                                      class="h-16 w-20 text-gray-300"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                <div class="mt-[70px] mx-4">
                  <div class="w-[1090px] overflow-hidden shadow-xs">
                    <div class="w-full overflow-x-auto rounded-lg ">
                      <table class="w-full">
                        <thead>
                          <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                          <th class="px-4 py-3">Booking ID</th>
                            <th class="px-4 py-3">User</th>
                            <th class="px-4 py-3">Room</th>
                            <th class="px-4 py-3">Amount</th>
                            <th class="px-4 py-3">Status</th>
                            <th class="px-4 py-3">Booking Date</th>
                            <th class="px-4 py-3">Booking End Date</th>
                            <th className="px-4 py-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                          {getData.map((val) => {
                            return (
                              <tr class="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                                <td class="px-4 py-3">
                                  <div class="flex items-center text-sm">
                                    <div>
                                      <p class="font-semibold">
                                        {val.b_id}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td class="px-4 py-3 text-sm">{val.u_firstName}</td>
                                <td class="px-4 py-3 text-sm">{val.r_room}</td>
                                <td class="px-4 py-3 text-sm">{val.b_price}</td>
                                <td class="px-4 py-3 text-xs">
                                  <span
                                    className={`px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full ${
                                      val.b_status === "Available"
                                        ? "bg-green-700"
                                        : val.b_status === "Booked"
                                        ? "bg-red-700"
                                        : val.b_status === "Check Out"
                                        ? "bg-yellow-600"
                                        : "bg-orange-600"
                                    }  dark:text-green-100`}
                                  >
                                    {val.b_status}
                                  </span>
                                </td>
                                <td class="px-4 py-3 text-sm">{val.b_startDate}</td>
                                <td class="px-4 py-3 text-sm">{val.b_endDate}</td>
                                <td class="px-4 py-3 text-sm">
                                <Link
                                    to={{pathname:`/dashboard/booking-room/edit/${val.b_id}`,
                                    search:`?name=${val.u_firstName}&room=${val.r_room}&price=${val.b_price}&status=${val.b_status}&date=${val.b_startDate}`
                                  }}
                                    className="mr-[15px] text-orange-400"
                                  >
                                    Edit
                                  </Link>
                                  <a onClick={()=>handleDeleteRoom(val.b_id)} className="text-red-700 cursor-pointer">
                                    Delete
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              null
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default DashBoardStat;
