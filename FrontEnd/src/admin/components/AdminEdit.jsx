import React, { useEffect, useState } from 'react'
import Navbaradmin from './Navbaradmin'
import Sidebar from './Sidebar'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import queryString from 'query-string';
import { useLocation , useParams ,useNavigate } from 'react-router-dom';
import axios from 'axios';
function AdminEdit() {

    const navigate = useNavigate()
    const {id} = useParams()
    const location = useLocation()
    const {name,lname,number,email} = queryString.parse(location.search)


    useEffect(()=>{
        if(!document.cookie){
            return navigate('/sign-in')
        }
    },[])

    const [adminupdate , setAdminupdate] = useState({
        id:id,
        admin_firstName :'',
        admin_lastName:'',
        admin_phone:'',
        admin_email:'',
    })

    console.log(adminupdate);

    const handleOnchange = (e) =>{
        const {name , value } = e.target

        setAdminupdate((prev)=>({
            ...prev,[name]:value
        }))
    }

    const handleOnsubmit = (e) =>{
        e.preventDefault()

        axios.put('http://localhost:5000/update-admin',adminupdate).then(res=>{
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
            
              <>
                <div class="w-full max-w-[550px] h-[450px] rounded-lg bg-white">
                  <form
                    class="py-6 px-9"
                    method='post'
                    onSubmit={handleOnsubmit}
                  >
                    <div class="mb-5">
                      <label
                        for="admin_firstName"
                        class="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Admin Name
                      </label>
                      <input
                        type="text"
                        name="admin_firstName"
                        placeholder={name}
                        onChange={handleOnchange}
                        required
                        class="w-[48%] mr-[10px]  rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                      <input
                        type="text"
                        name="admin_lastName"
                        placeholder={lname}
                        onChange={handleOnchange}
                        required
                        class="w-[49%] rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                    <div class="mb-5">
                      <label
                        for="admin_phone"
                        class="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Admin Phone
                      </label>
                      <input
                        type="text"
                        name="admin_phone"
                        id="admin_phone"
                        placeholder={number}
                        onChange={handleOnchange}
                        required
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                    <div class="mb-5">
                      <label
                        for="admin_email"
                        class="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Admin Email
                      </label>
                      <input
                        type="email"
                        name="admin_email"
                        id="admin_email"
                        placeholder={email}
                        onChange={handleOnchange}
                        required
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
              </>
          
          </div>
        </main>
      </div>
    </>
  )
}

export default AdminEdit