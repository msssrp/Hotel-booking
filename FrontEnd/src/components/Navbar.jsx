import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const [userID, setUserID] = useState(null);

  const [userData, setUserData] = useState([]);

  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);

  const handleOpen = () => {
    setOpenMenu(!openMenu);
  };

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
          if (res.data.status === "success" && res.data.role === "Notadmin") {
            setUserID(res.data.decode.id);
          }
        })
        .catch((err) => {
          if (err) {
            return console.log(err);
          }
        });
    }

    if (userID) {
      axios
        .post("http://localhost:5000/user", { u_id: userID })
        .then((res) => {
          setUserData(res.data.result);
        })
        .catch((err) => {
          if (err) {
            return console.log(err);
          }
        });
      return;
    }
  }, [userID]);

  return (
    <div className="font-Inter text-[13px]">
      <nav className="mt-5 bg-white-100 border-b-2 pb-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <div className="border-r-2">
                <Link
                  to="/"
                  className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900 pr-5"
                >
                  <svg
                    className="h-6 w-6 mr-1 text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  <span className="font-bold">Hotel</span>
                </Link>
              </div>

              <div className="hidden md:flex items-center space-x-1">
                <Link
                  to="/booking"
                  className="py-5 px-3 text-gray-700 hover:text-gray-900  pr-5"
                >
                  Booking
                </Link>
                
              
                <Link
                  to='/about-us'
                  className="py-5 px-3 text-gray-700 hover:text-gray-900  pr-5"
                >
                  About Us
                </Link>
                <Link
                  to='/privacy'
                  className="py-5 px-3 text-gray-700 hover:text-gray-900  pr-5"
                >
                  Privacy & Legal
                </Link>
                <Link
                  to='/contact'
                  className="py-5 px-3 text-gray-700 hover:text-gray-900  pr-5"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {document.cookie ? (
                <div className="hidden md:flex items-center space-x-1">
                  {userData.length > 0 ? (
                    <>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="relative ml-3">
                          <div className="pr-[10px]">
                            <button onClick={handleOpen}>
                              <p>Welcome Mr. {userData[0].u_firstName}</p>
                            </button>
                          </div>

                          <div
                            className={`absolute ${
                              openMenu ? "block" : "hidden"
                            } right-[-4.7rem] z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                          >
                            <Link
                              to='/my-book'
                              className="block px-4 py-2 text-sm text-gray-700 hover:underline"
                              role="menuitem"
                              tabindex="-1"
                              id="user-menu-item-1"
                            >
                              My Booked
                            </Link>
                            <Link
                              to='/user'
                              className="block px-4 py-2 text-sm text-gray-700 hover:underline"
                              role="menuitem"
                              tabindex="-1"
                              id="user-menu-item-1"
                            >
                              My Profile
                            </Link>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}
                  <div>
                    <a
                      onClick={() => {
                        localStorage.removeItem("u_id");
                        document.cookie = "token=; max-age=0";
                        navigate("/sign-in");
                      }}
                      className="cursor-pointer py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300"
                    >
                      Logout
                    </a>
                  </div>
                </div>
              ) : (
                <Link
                  to="/sign-in"
                  className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300"
                >
                  Login
                </Link>
              )}
            </div>

            <div class="md:hidden flex items-center">
              <button className="mobile-menu-button">
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
