import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import QueryString from "query-string";
import Navbaradmin from "./Navbaradmin";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function EditRoom() {
  const navigate = useNavigate();

  const [loaded, setLoaded] = useState(false);

  const [roomData, setRoomData] = useState({
    roomNumber: "",
    roomType: "",
    roomPrice: "",
    status: "",
  });

  console.log(roomData);
  const [roomPictureFile, setRoomPictureFile] = useState([]);

  const [imageToshow, setImageToshow] = useState(null);

  const [roomPreview, setRoomPreview] = useState(null);

  const { id } = useParams();
  const location = useLocation();
  const { r_room, r_type, r_price, r_status } = QueryString.parse(
    location.search
  );

  const handleFileOnchange = (e) => {

    
    setRoomPictureFile(e.target.files[0]);
    const render = new FileReader();
    render.onload = () => {
      setRoomPreview(render.result);
    };
    render.readAsDataURL(e.target.files[0]);
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setRoomData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  

  const handleOnsubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("roomNumber", roomData.roomNumber);
    formData.append("roomType", roomData.roomType);
    formData.append("roomPrice", roomData.roomPrice);
    formData.append('status',roomData.status)
    formData.append("file", roomPictureFile);

    axios
      .put("http://localhost:5000/update-room", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
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
  };

  useEffect(() => {
    if (!document.cookie) {
      return navigate("/sign-in");
    }

    axios
      .get(`http://localhost:5000/show-img/${id}`)
      .then((res) => {
        setImageToshow(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setLoaded(!loaded);
  }, []);

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
        <main className="flex-1 h-full">
          <div className="flex flex-col justify-center items-center h-full bg-[#F4F2F2] pt-[50px] pb-[50px]">
            {loaded ? (
              <>
                <div class="w-full max-w-[550px] h-full bg-white">
                  <form
                    class="py-6 px-9"
                    action="post"
                    onSubmit={handleOnsubmit}
                  >
                    <div class="mb-5">
                      <label
                        for="roomID"
                        class="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Room ID
                      </label>
                      <input
                        type="text"
                        name="roomID"
                        id="roomID"
                        disabled
                        value={id}
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>

                    <div class="mb-5">
                      <label
                        for="roomNumber"
                        class="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Room Number
                      </label>
                      <input
                        type="text"
                        name="roomNumber"
                        placeholder={r_room}
                        onChange={handleOnchange}
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                    <div class="mb-5">
                      <label
                        for="roomType"
                        class="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Room Type
                      </label>
                      <input
                        type="text"
                        name="roomType"
                        id="roomType"
                        placeholder={r_type}
                        onChange={handleOnchange}
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                    <div class="mb-5">
                      <label
                        for="roomPrice"
                        class="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Room Price
                      </label>
                      <input
                        type="text"
                        name="roomPrice"
                        id="roomPrice"
                        placeholder={r_price}
                        onChange={handleOnchange}
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                    <div class="mb-5">
                  <label
                    for="status"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Status {r_status}
                  </label>
                  <select name="status" onChange={handleOnchange} id="status" class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" >
                  <option selected={r_status} disabled>Change Status</option>
                   <option value='Pending'>Pending</option>
                    <option  value="Booked">Booked</option>
                    <option  value="Available">Available</option>
                  </select>
                </div>

                    <div class="mb-6 pt-4">
                      <label class="mb-5 block text-xl font-semibold text-[#07074D]">
                        Room View
                      </label>

                      <div class="mb-8">
                        <label class="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
                          <img
                            src={`data:image/jpeg;base64,${imageToshow}`}
                            alt="Room View"
                          />
                        </label>
                      </div>
                    </div>

                    <div class="mb-6 pt-4">
                      <label class="mb-5 block text-xl font-semibold text-[#07074D]">
                        {!roomPreview && <>Upload image</>}
                        {roomPreview && <>Change image</>}
                      </label>

                      <div class="mb-8">
                        <input
                          type="file"
                          name="file"
                          id="file"
                          class="sr-only"
                          onChange={handleFileOnchange}
                        />
                        <label
                          for="file"
                          class="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                        >
                          <div>
                            <span class="mb-2 block text-xl font-semibold text-[#07074D]">
                              Drop files here
                            </span>
                            <span class="mb-2 block text-base font-medium text-[#6B7280]">
                              Or
                            </span>
                            <span class="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                              Browse
                            </span>
                          </div>
                        </label>
                      </div>

                      {roomPreview && (
                        <div className="mb-8">
                          <label
                            htmlFor=""
                            className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                          >
                            <img
                              src={roomPreview}
                              alt="Selected file preview"
                              className="w-full"
                            />
                          </label>
                        </div>
                      )}
                    </div>

                    <div>
                      <button class="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                        Update Room
                      </button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              navigate("/dashboard")
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default EditRoom;
