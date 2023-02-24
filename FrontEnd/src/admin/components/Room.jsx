import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbaradmin from "./Navbaradmin";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Room() {
  const navigate = useNavigate();

  const [roomData, setRoomData] = useState([]);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!document.cookie) {
      return navigate("/sign-in");
    }

    axios
      .get("http://localhost:5000/roomData")
      .then((res) => {
        setRoomData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setLoaded(!loaded);
  }, []);

  const deleteRoom = (id) =>{

    axios.delete(`http://localhost:5000/delete-room/${id}`).then(res=>{
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
        <Sidebar/>
        <main className="flex-1 h-screen">
        <div className="flex flex-col justify-center items-center h-full bg-[#F4F2F2]">
      {loaded && roomData.length > 0 ? (
        <>
          <div class="mx-4 mt-[-340px]">
            <div class="p-4 w-[1090px] overflow-hidden shadow-xs">
              <div class="w-full overflow-x-auto rounded-lg ">
                <table class="w-full">
                  <thead>
                    <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                      <th class="px-4 py-3">Room ID</th>
                      <th class="px-4 py-3">Room</th>
                      <th class="px-4 py-3">Room Type</th>
                      <th class="px-4 py-3">Room Price</th>
                      <th class="px-4 py-3">Room Status</th>
                      <th class="px-4 py-3">Room Reviews</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                    {roomData.map((val) => {
                      return (
                        <tr class="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                          <td class="px-4 py-3">
                            <div class="flex items-center text-sm">
                              <div>
                                <p class="font-semibold">{val.r_id}</p>
                              </div>
                            </div>
                          </td>
                          <td class="px-4 py-3 text-sm">{val.r_room}</td>
                          <td class="px-4 py-3 text-sm">{val.r_type}</td>
                          <td class="px-4 py-3 text-sm">{val.r_price}</td>
                          <td class="px-4 py-3 text-xs">
                                  <span
                                    className={`px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full ${
                                      val.r_status === "Available"
                                        ? "bg-green-700"
                                        : val.r_status === "Booked"
                                        ? "bg-red-700"
                                        : "bg-orange-600"
                                    }  dark:text-green-100`}
                                  >
                                    {val.r_status}
                                  </span>
                                </td>
                                <td class="px-4 py-3 text-sm">{val.r_reviews}</td>
                          <td class="px-4 py-3 text-sm">
                            <Link
                              to={{
                                pathname: `/dashboard/room/room-edit/${val.r_id}`,
                                search: `?r_room=${val.r_room}&r_type=${val.r_type}&r_price=${val.r_price}&r_status=${val.r_status}`,
                              }}
                              className="mr-[15px] text-orange-400"
                            >
                              Edit
                            </Link>
                            <a onClick={()=>{deleteRoom(val.r_id)}} className="text-red-700 cursor-pointer">
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

export default Room;
