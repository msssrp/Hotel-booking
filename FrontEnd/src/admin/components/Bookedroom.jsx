import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import Navbaradmin from "./Navbaradmin";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Bookedroom() {
  const navigate = useNavigate();
  const [getData, setGetData] = useState([]);

  useEffect(() => {
    if (!document.cookie) {
      return navigate("/sign-in");
    }

    axios
      .get("http://localhost:5000/userData")
      .then((res) => {
        setGetData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
          <div class="flex flex-col justify-center items-center h-full bg-[#F4F2F2]">
            <div class="w-[1090px] overflow-hidden shadow-xs  mt-[-150px]">
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
        </main>
      </div>
    </>
  );
}

export default Bookedroom;
