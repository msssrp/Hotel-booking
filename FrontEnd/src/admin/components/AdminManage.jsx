import React,{useState,useEffect} from "react";
import Navbaradmin from "./Navbaradmin";
import Sidebar from "./Sidebar";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AdminManage() {

    const navigate = useNavigate()
    const [getAdminData , setGetAdminData ] = useState([])

    useEffect(()=>{
        if(!document.cookie){
            return navigate('/sign-in')
        }

        axios.get('http://localhost:5000/adminData').then(res=>{
            setGetAdminData(res.data)
        }).catch(err=>{
            if(err){
                console.log(err);
            }
        })

    },[])

    const handleDeleteAdmin = (id) =>{
        axios
      .delete(`http://localhost:5000/delete-user/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          toast.success(`${res.data.msg}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          
          });
        } else {
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
      .catch((err) => {
        console.log(err);
      });
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
          <div className="flex flex-col justify-center items-center h-full bg-[#F4F2F2]">
            <div class="mx-4 mt-[-130px]">
              <div class="p-4 w-[1090px] overflow-hidden shadow-xs">
                <div class="w-full overflow-x-auto rounded-lg ">
                  <table class="w-full">
                    <thead>
                      <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                        <th class="px-4 py-3">Admin ID</th>
                        <th class="px-4 py-3">First name</th>
                        <th class="px-4 py-3">Last Name</th>
                        <th class="px-4 py-3">Phone number</th>
                        <th class="px-4 py-3">Email</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                        {getAdminData.map((val)=>{
                            return (
                                <tr class="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                        <td class="px-4 py-3">
                          <div class="flex items-center text-sm">
                            <div>
                              <p class="font-semibold">{val.u_id}</p>
                            </div>
                          </div>
                        </td>
                        <td class="px-4 py-3 text-sm">{val.u_firstName}</td>
                        <td class="px-4 py-3 text-sm">{val.u_lastName}</td>
                        <td class="px-4 py-3 text-sm">{val.u_phone}</td>
                        <td class="px-4 py-3 text-sm">{val.u_email}</td>
                        <td class="px-4 py-3 text-sm">
                          <Link to={{pathname:`/dashboard/admin-manage/edit/${val.u_id}`,
                            search:`?name=${val.u_firstName}&lname=${val.u_lastName}&number=${val.u_phone}&email=${val.u_email}`
                        }} className="mr-[15px] text-orange-400">
                            Edit
                          </Link>
                          <Link to='' onClick={() => handleDeleteAdmin(val.u_id)} className="text-red-700">
                            Delete
                          </Link>
                        </td>
                      </tr>
                            )
                        })}
                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminManage;
