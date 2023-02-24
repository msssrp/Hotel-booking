import React, { useState, useEffect } from "react";
import Navbaradmin from "./Navbaradmin";
import Sidebar from "./Sidebar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
function AdminCreate() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!document.cookie) {
      return navigate("/sing-in");
    }
  }, []);

  const [createUser, setCreateUser] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setCreateUser((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "u_cpassword") {
      return setConfirmPassword(value);
    }
  };

  const handleOnsubmit = (e) => {
    e.preventDefault();

    if (createUser.password !== confirmPassword) {
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

    axios.post("http://localhost:5000/register-admin", createUser).then((res) => {
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
            <div class="w-full max-w-[550px] h-full bg-white">
              <form class="py-6 px-9" action="post" onSubmit={handleOnsubmit}>
                <div class="mb-5">
                  <label
                    for="firstName"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    onChange={handleOnchange}
                    required
                    class="w-full  rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="mb-5">
                  <label
                    for="lastName"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    onChange={handleOnchange}
                    required
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div class="mb-5">
                  <label
                    for="phoneNumber"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    onChange={handleOnchange}
                    required
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div class="mb-5">
                  <label
                    for="email"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleOnchange}
                    required
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>

                <div class="mb-5">
                  <label
                    for="password"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Password
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
                    for="u_cpassword"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="u_cpassword"
                    id="u_cpassword"
                    onChange={handleOnchange}
                    required
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>

                <div>
                  <button class="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none mt-[25px]">
                    Create New Admin
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

export default AdminCreate;
