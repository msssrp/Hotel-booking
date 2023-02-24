import React, { useState, useEffect } from "react";
import Navbaradmin from "./Navbaradmin";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Createroom() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!document.cookie) {
      return navigate("/sign-in");
    }

    setLoaded(!loaded);
  }, []);

  const navigate = useNavigate();

  const [roomDetails, setRoomDetails] = useState({
    roomNumber: "",
    roomType: "",
    roomPrice: Number,
  });

  const [roomPictureFile, setRoomPictureFile] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setRoomDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setRoomPictureFile(e.target.files[0]);
    const render = new FileReader();
    render.onload = () => {
      setPreviewImage(render.result);
    };
    render.readAsDataURL(e.target.files[0]);
  };

  const handleOnsubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("roomNumber", roomDetails.roomNumber);
    formData.append("roomType", roomDetails.roomType);
    formData.append("roomPrice", roomDetails.roomPrice);
    formData.append("file", roomPictureFile);

    axios
      .post("http://localhost:5000/upload-img", formData, {
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

  console.log(roomDetails, roomPictureFile);

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
        <main className={`flex-1 ${previewImage ? "h-full" : "h-screen"}`}>
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
                        for="roomNumber"
                        class="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Room Number
                      </label>
                      <input
                        type="text"
                        name="roomNumber"
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
                        onChange={handleOnchange}
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>

                    <div class="mb-6 pt-4">
                      <label class="mb-5 block text-xl font-semibold text-[#07074D]">
                        {!previewImage && (<>Upload Room image</>)}
                        {previewImage && (<>Change picture</>)}
                      </label>

                      
                        <div
                          className={`mb-8 ${
                            !roomPictureFile ? "hidden" : null
                          }`}
                        >
                          <input
                            type="file"
                            name="file"
                            id="file"
                            className="sr-only"
                            onChange={handleFileChange}
                          />
                          <label
                            htmlFor="file"
                            className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                          >
                            <div>
                              <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                                Drop files here
                              </span>
                              <span className="mb-2 block text-base font-medium text-[#6B7280]">
                                Or
                              </span>
                              <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                                Browse
                              </span>
                            </div>
                          </label>
                        </div>
                     
                      {previewImage && (
                        <div className="mb-8">
                            <label htmlFor="" className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
                          <img
                            src={previewImage}
                            alt="Selected file preview"
                            className="w-full"
                          />
                          </label>
                        </div>
                      )}
                    </div>

                    <div>
                      <button class="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none mt-[25px]">
                        Create New Room
                      </button>
                    </div>
                  </form>
                </div>
              </>
            ) : null}
          </div>
        </main>
      </div>
    </>
  );
}

export default Createroom;
