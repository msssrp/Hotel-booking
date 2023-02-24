import React,{useState ,useEffect} from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function UserUpdate() {

    const userId = localStorage.getItem('u_id')
    const navigate = useNavigate()

    const [openUserInfo , setOpenUserInfo] = useState(true)
    const [openChangePassword , setOpenChangePassword] = useState(false)

   
    useEffect(()=>{
        if(!document.cookie){
            return navigate('/sign-in')
        }

    },[])

    const [updateUser,setUpdateUser] = useState({
        id:userId,
        u_firstName:'',
        u_lastName:'',
        u_phone:'',
        u_email:''
    })


    const handleOnchange = (e) =>{
        const {name,value} = e.target
        
        setUpdateUser((prev)=>({
            ...prev,[name]:value
        }))
    }

    const handleOnsubmit = (e) =>{
        e.preventDefault()

        
        axios.put('http://localhost:5000/update-user',updateUser).then(res=>{
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
        }).catch(err=>{
            console.log(err);
        })
        
    }


    const [newPassword, setNewPassword] = useState({
        id:userId,
        password:''
      });
      const [confirmPassword, setConfirmPassword] = useState('');

    const handleOnchangePassword = (e) =>{
        const {name , value } = e.target

        setNewPassword((prev)=>({
            ...prev,[name]:value
        }))

        if(name === 'cpassword'){
            return setConfirmPassword(value)
        }
    }

    const handleOnsubmitPassword = (e) => {
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
      <Navbar />

      <div className="conatiner flex justify-center items-center mt-[150px]">

       
          <div className="h-full w-[300px] border rounded-xl">
            <div className="Menu text-center">
              <ul className="m-[20px]">
                <li className="mb-[30px]"><a className="cursor-pointer" onClick={()=>{
                    setOpenUserInfo(true)
                    setOpenChangePassword(false)
                }}>Change Information</a></li>
                <li><a className="cursor-pointer" onClick={()=>{
                    setOpenChangePassword(true)
                    setOpenUserInfo(false)
                }}>Change Password</a></li>
              </ul>
            </div>
          </div>
     

        <div className="ml-[50px] w-[900px] border rounded-xl">
          <div className="h-full">

            {openUserInfo ? (
                <div class="w-full h-[450px] rounded-lg bg-white">
                <form
                  class="py-6 px-9"
                  method='post'
                onSubmit={handleOnsubmit}
                >
                  <div class="mb-5">
                    <label
                      for="u_firstName"
                      class="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      First name & Last name
                    </label>
                    <input
                      type="text"
                      name="u_firstName"
                        onChange={handleOnchange}
                      required
                      class="w-[48%] mr-[10px]  rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                    <input
                      type="text"
                      name="u_lastName"
                     
                      required
                      class="w-[49%] rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                  <div class="mb-5">
                    <label
                      for="u_phone"
                      class="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      name="u_phone"
                      id="u_phone"
                      onChange={handleOnchange}
                      required
                      class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                  <div class="mb-5">
                    <label
                      for="u_email"
                      class="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="u_email"
                      id="u_email"
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
            ) :null}
            
            {openChangePassword ? (
                <div class="w-full  h-[350px] rounded-lg bg-white">
                <form class="py-6 px-9" method="post" onSubmit={handleOnsubmitPassword}>
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
                      onChange={handleOnchangePassword}
                      required
                      class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                    <label
                      for="cpassword"
                      class="mb-3 block text-base font-medium text-[#07074D] mt-[20px]"
                    >
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="cpassword"
                      id="cpassword"
                       onChange={handleOnchangePassword}
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
            ) : null}

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default UserUpdate;
