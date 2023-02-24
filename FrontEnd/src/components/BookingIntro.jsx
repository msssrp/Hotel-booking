import React, { useState, useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function BookingIntro() {
  const [userID, setUserID] = useState(null);

  const [userData, setUserData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (document.cookie) {
      const token = document.cookie
        .split(";")
        .find((c) => c.trim().startsWith("token="))
        .split("=")[1];

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      axios
        .post("http://localhost:5000/auth", token)
        .then((res) => {
          if (res.data.status === "success" && res.data.role === 'Notadmin') {
            setUserID(res.data.decode.id);
          }
        })
        .catch((err) => {
          if (err) {
            return console.log(err);
          }
        });
    }

    if(userID){
      axios.post('http://localhost:5000/user',{u_id:userID}).then(res=>{
        setUserData(res.data.result)
      }).catch(err=>{
        console.log(err);
      })
    }
  }, [userID]);



  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  return (
    <div className="flex flex-row justify-center items-center mt-[100px] font-Inter">
      <div className="FirstTopic w-[350px]">
        <div className="Topic1">
          <h1 className="text-[40px] font-semibold">
            Our world is your
            <br />
            play ground {userData && userData.length > 0 ? (
              <>
               Mr.{userData[0].u_firstName}
              </>
            ):null}
          </h1>
        </div>
        <div className="Topic1-span mb-5 mt-5">
          <span>
            We give you more of what you want and less of what you don't need.
          </span>
        </div>
        <div className="Toic1-button">
          <button class="bg-white text-[#777F91] hover: font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-5">
            <p className="text-[12px]">Start Your Search</p>
          </button>
          {userID ? (
            <>
              <a
                onClick={() => {
                  document.cookie = "token=; max-age=0";
                  navigate("/sign-in");
                }}
                className="cursor-pointer bg-[#6A64F1] text-[12px] text-white hover: font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              >
                Logout
              </a>
            </>
          ) : (
            <Link
              to="/sign-in"
              class="bg-[#6A64F1] text-[12px] text-white hover: font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      <div className="SecTopic w-[500px] ml-[150px]">
        <div class="flex items-center justify-center p-12">
          <div class="mx-auto w-full max-w-[550px]">
            <form action="https://formbold.com/s/FORM_ID" method="POST">
              <div class="-mx-3 flex flex-wrap">
                <div class="w-full px-3 sm:w-1/2">
                  <div class="mb-5">
                    <label
                      for="fName"
                      class="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="fName"
                      id="fName"
                      placeholder="First Name"
                      required
                      class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div class="w-full px-3 sm:w-1/2">
                  <div class="mb-5">
                    <label
                      for="lName"
                      class="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lName"
                      id="lName"
                      placeholder="Last Name"
                      required
                      class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
              </div>
              <div class="mb-5">
                <label
                  for="guest"
                  class="mb-3 block text-base font-medium text-[#07074D]"
                >
                  How many guest are you bringing?
                </label>
                <input
                  type="number"
                  name="guest"
                  id="guest"
                  placeholder="5"
                  min="0"
                  required
                  class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div className="pb-5">
                <Datepicker
                  primaryColor={"white"}
                  value={value}
                  onChange={handleValueChange}
                />
              </div>

              <div class="mb-5">
                <label class="mb-3 block text-base font-medium text-[#07074D]">
                  Are you coming to the event?
                </label>
                <div class="flex items-center space-x-6">
                  <div class="flex items-center">
                    <input
                      type="radio"
                      name="radio1"
                      id="radioButton1"
                      class="h-5 w-5"
                    />
                    <label
                      for="radioButton1"
                      class="pl-3 text-base font-medium text-[#07074D]"
                    >
                      Yes
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input
                      type="radio"
                      name="radio1"
                      id="radioButton2"
                      class="h-5 w-5"
                    />
                    <label
                      for="radioButton2"
                      class="pl-3 text-base font-medium text-[#07074D]"
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingIntro;
