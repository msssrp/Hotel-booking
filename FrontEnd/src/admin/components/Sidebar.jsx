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
                  <svg fill="#9CA3AF" width="25px" height="25px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" id="online_x5F_booking" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M43.932,348.891h186.576v61.698h-37.651c-7.236,0-13.103,5.866-13.103,13.103v17.166h156.431v-17.166  c0-7.236-5.866-13.103-13.103-13.103h-37.651v-61.698h182.638V71.142H43.932V348.891z M75.728,104.71h360.545v210.614H75.728V104.71  z"/><polygon points="277.535,262.801 242.691,253.667 251.825,288.511 260.307,280.029 272.811,292.756 274.774,290.826   274.793,290.846 276.922,288.716 281.061,284.649 268.485,271.851 "/><path d="M273.545,202.813c-9.289,0-16.82-7.531-16.82-16.82c0-9.29,7.531-16.82,16.82-16.82v-28.992h-83.59h-21.977v20.417h-11.567  v-20.417h-50.046v28.992c9.29,0,16.82,7.531,16.82,16.82c0,9.289-7.531,16.82-16.82,16.82v30.132h50.046v-20.527h11.567v20.527  h21.977h83.59V202.813z M167.979,196.827h-11.567v-20.527h11.567V196.827z M236.243,217.613h-42.451v-11.567h42.451V217.613z   M236.243,192.347h-42.451v-11.567h42.451V192.347z M236.243,167.081h-42.451v-11.567h42.451V167.081z"/><path d="M406.635,197.142c-2.102-2.359-5.288-3.441-8.392-2.849l-11.887,2.268l-55.087-46.794  c-5.368-4.559-12.17-7.232-19.211-7.132c-2.24,0.031-4.586,0.328-6.915,1.038c-4.194,1.278-6.032,6.043-3.787,9.809  c0.033,0.056,0.066,0.111,0.102,0.167c0.441,0.719,1.038,1.339,1.723,1.833l27.073,19.56l7.757,46.034  c0.31,1.834,1.245,3.503,2.647,4.725l4.819,4.194c1.3,1.131,3.327,0.218,3.341-1.505l0.32-39.803l26.992,19.501  c6.16,4.451,14.426,4.646,20.79,0.493l10.397-6.788c1.181-0.771,1.399-2.412,0.461-3.465L406.635,197.142z"/><path d="M368.429,166.423c1.657,1.476,3.826,2.244,6.042,2.14l28.887-1.358c1.401-0.314,1.789-2.128,0.639-2.987l-4.268-3.189  c-1.242-0.928-2.768-1.396-4.316-1.325l-34.829-3.819c-1.414-0.155-2.193,1.596-1.131,2.542L368.429,166.423z"/></svg>
                  <span class="flex-1 ml-3 whitespace-nowrap">Booking</span>
                </Link>
              </li>

              <li>
                <div>
                  <a
                    onClick={handleRoommenuOpen}
                    class="flex items-center cursor-pointer p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg width="25px" height="25px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <path fill="#9CA3AF" d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z" class="ci-primary"/>
  <rect width="32" height="64" x="256" y="232" fill="var(--ci-primary-color, currentColor)" class="ci-primary"/>
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
                  <svg fill="#9CA3AF" width="25px" height="25px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
    <path d="M276.941 440.584v565.722c0 422.4 374.174 625.468 674.71 788.668l8.02 4.292 8.131-4.292c300.537-163.2 674.71-366.268 674.71-788.668V440.584l-682.84-321.657L276.94 440.584Zm682.73 1479.529c-9.262 0-18.523-2.372-26.993-6.89l-34.9-18.974C588.095 1726.08 164 1495.906 164 1006.306V404.78c0-21.91 12.65-41.788 32.414-51.162L935.727 5.42c15.134-7.228 32.866-7.228 48 0l739.313 348.2c19.765 9.374 32.414 29.252 32.414 51.162v601.525c0 489.6-424.207 719.774-733.779 887.943l-34.899 18.975c-8.47 4.517-17.731 6.889-27.105 6.889Zm467.158-547.652h-313.412l-91.595-91.482v-83.803H905.041v-116.78h-83.69l-58.503-58.504c-1.92.113-3.84.113-5.76.113-176.075 0-319.285-143.21-319.285-319.285 0-176.075 143.21-319.398 319.285-319.398 176.075 0 319.285 143.323 319.285 319.398 0 1.92 0 3.84-.113 5.647l350.57 350.682v313.412Zm-266.654-112.941h153.713v-153.713L958.462 750.155l3.953-37.27c1.017-123.897-91.595-216.621-205.327-216.621S550.744 588.988 550.744 702.72c0 113.845 92.612 206.344 206.344 206.344l47.21-5.309 63.811 63.7h149.873v116.78h116.781v149.986l25.412 25.299Zm-313.4-553.57c0 46.758-37.949 84.706-84.706 84.706-46.758 0-84.706-37.948-84.706-84.706s37.948-84.706 84.706-84.706c46.757 0 84.706 37.948 84.706 84.706" fill-rule="evenodd"/>
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