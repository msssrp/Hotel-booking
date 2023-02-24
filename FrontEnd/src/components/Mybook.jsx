import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Mybook() {

  const userID = localStorage.getItem("u_id");

    const [getBookData , setGetBookData] = useState([])

  useEffect(() => {
    if (!document.cookie) {
      return navigate("/sign-in");
    }
    axios
      .get(`http://localhost:5000/booked-total/${userID}`)
      .then((res) => {
        setGetBookData(res.data);
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
      <Navbar />

      <div className="flex justify-center items-center">
        <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 w-[1300px] mt-[150px] mb-[150px]">
          <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                  Name
                </th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                  Status
                </th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                  Room
                </th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                  Type
                </th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                  Have to pay
                </th>
                <th
                  scope="col"
                  class="px-6 py-4 font-medium text-gray-900"
                ></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                {getBookData.map((val)=>{
                    return(
                        <tr class="hover:bg-gray-50">
                        <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                         
                          <div class="text-sm">
                            <div class="font-medium text-gray-700">{val.u_firstName} {val.u_lastName}</div>
                    
                          </div>
                        </th>
                        <td class="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 rounded-full  px-2 py-1 text-xs font-semibold  ${
                                      val.b_status === "Available"
                                        ? "bg-green-700"
                                        : val.b_status === "Booked"
                                        ? "bg-red-700"
                                        : val.b_status === "Check Out"
                                        ? "bg-yellow-600"
                                        : "bg-orange-600"
                                    }  dark:text-green-100`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${
                                      val.b_status === "Available"
                                        ? "bg-green-50"
                                        : val.b_status === "Booked"
                                        ? "bg-red-50"
                                        : val.b_status === "Check Out"
                                        ? "bg-yellow-50"
                                        : "bg-orange-50"
                                    }  dark:text-green-100`}></span>
                            {val.b_status}
                          </span>
                        </td>
                        <td class="px-6 py-4">{val.r_room}</td>
                        <td class="px-6 py-4">
                          <div class="flex gap-2">
                            <span class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                              {val.r_type}
                            </span>
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <div class="flex gap-2">
                            <span class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                              {val.total_cost}
                            </span>
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <div class="flex justify-center gap-4">
                            <a className="cursor-pointer" x-data="{ tooltip: 'Delete' }" onClick={()=>handleDeleteRoom(val.b_id)}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="h-6 w-6"
                                x-tooltip="tooltip"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </a>
                            <Link x-data="{ tooltip: 'Book' }" to={{pathname:`/book-room/payment/${userID}`}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16"> <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/> </svg>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    )
                })}
             
            
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Mybook;
