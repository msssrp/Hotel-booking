import React,{useState} from 'react'
import { Link } from 'react-router-dom'
function Sidebar() {


  const [RoomMenu , setRoomMenu] = useState(false)
  const [UserMenu , setUserMenu] = useState(false)
  const [adminMenu , setAdminMenu] = useState(false)
  const handleRoommenuOpen = () =>{
    setRoomMenu(!RoomMenu)
  }

  const handleUserMenuOpen = () =>{
    setUserMenu(!UserMenu)
  }

  const handleAdminMenuOpen = ()=>{
    setAdminMenu(!adminMenu)
  }
  return (
    <>
        
        <aside
          id="default-sidebar"
          class="w-[250px] transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul class="space-y-2">
              <li>
                <Link
                  to="/dashboard"
                  class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <svg
                    aria-hidden="true"
                    class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <span class="ml-3">Dashboard</span>
                </Link>
              </li>

              <li>
                <div>
                <a
                  onClick={handleUserMenuOpen}
                  class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <svg
                    aria-hidden="true"
                    class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="flex-1 ml-3 whitespace-nowrap">Users</span>
                </a>
                <div
                    className={`${
                      UserMenu ? "block" : "hidden"
                    } mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-center`}
                  >
                    <Link
                      to="/dashboard/user"
                      className="block px-4 py-2 text-sm text-gray-700 hover:border-2 rounded-md"
                    >
                      All Users
                    </Link>
                    <Link
                      to="/dashboard/user/create-user"
                      className="block px-4 py-2 text-sm text-gray-700 hover:border-2 rounded-md"
                    >
                      Create User
                    </Link>
                  </div>
                </div>
              </li>

              <li>
                <Link
                  to='/dashboard/booking-room'
                  class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                  </svg>
                  <span class="flex-1 ml-3 whitespace-nowrap">Booking</span>
                </Link>
              </li>

              <li>
                <div>
                  <a
                    onClick={handleRoommenuOpen}
                    class="flex items-center cursor-pointer p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg
                      aria-hidden="true"
                      class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                      <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                    </svg>
                    <span class="flex-1 ml-3 whitespace-nowrap">Rooms</span>
                  </a>

                  <div
                    className={`${
                      RoomMenu ? "block" : "hidden"
                    } mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-center`}
                  >
                    <Link
                      to="/dashboard/room"
                      className="block px-4 py-2 text-sm text-gray-700 hover:border-2 rounded-md"
                    >
                      All Rooms
                    </Link>
                    <Link
                      to="/dashboard/room/create-room"
                      className="block px-4 py-2 text-sm text-gray-700 hover:border-2 rounded-md"
                    >
                      Create Room
                    </Link>
                  </div>
                </div>
              </li>
              <li>
              <div>
                <a
                  onClick={handleAdminMenuOpen}
                  class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <svg
                    aria-hidden="true"
                    class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="flex-1 ml-3 whitespace-nowrap">Admin</span>
                </a>
                <div
                    className={`${
                      adminMenu ? "block" : "hidden"
                    } mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-center`}
                  >
                    <Link
                      to="/dashboard/admin-manage"
                      className="block px-4 py-2 text-sm text-gray-700 hover:border-2 rounded-md"
                    >
                      All admin
                    </Link>
                    <Link
                      to="/dashboard/admin-manage/create"
                      className="block px-4 py-2 text-sm text-gray-700 hover:border-2 rounded-md"
                    >
                      Create Admin
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </aside>
    
    </>
  )
}

export default Sidebar