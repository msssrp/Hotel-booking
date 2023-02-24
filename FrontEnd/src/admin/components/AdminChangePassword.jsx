import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbaradmin from "./Navbaradmin";
import Sidebar from "./Sidebar";
function AdminChangePassword() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState({
    id:id,
    password:''
  });
  const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(()=>{
        if(!document.cookie){
            return navigate('/sign-in')
        }
    },[])

    const handleOnchange = (e) =>{
        const {name , value } = e.target

        setNewPassword((prev)=>({
            ...prev,[name]:value
        }))

        if(name === 'cpassword'){
            return setConfirmPassword(value)
        }
    }

    const handleOnsubmit = (e) => {
        e.preventDefault();
    
        if (newPassword.password !== confirmPassword) {
          toast.error("Password not match", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return;
        }
    
        axios.put("http://localhost:5000/admin-change-password", newPassword).then((res) => {
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
        });
      };

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
              <div class="w-full max-w-[550px] h-[350px] rounded-lg bg-white">
                <form class="py-6 px-9" method="post" onSubmit={handleOnsubmit}>
                  <div class="mb-5">
                    <label
                      for="password"
                      class="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                    onChange={handleOnchange}
                      required
                      class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                    <label
                      for="cpassword"
                      class="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="cpassword"
                      id="cpassword"
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
  );
}

export default AdminChangePassword;
