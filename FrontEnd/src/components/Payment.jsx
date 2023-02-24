import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Payment() {
  const { id } = useParams();
  const [getBookData, setGetBookData] = useState([]);
  const navigate = useNavigate();

  

  useEffect(() => {
    if (!document.cookie) {
      return navigate("/sign-in");
    }
    axios
      .get(`http://localhost:5000/booked-total/${id}`)
      .then((res) => {
        setGetBookData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleOnsubmit = (e) =>{
    e.preventDefault()
    const totalPrice = getBookData[0].total_cost
    axios.put(`http://localhost:5000/booking-confirm/${getBookData[0].b_id}`,{totalPrice:totalPrice}).then(res=>{
      if(res.data.status === 'success'){
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

  const handleDeleteBook = () =>{
    axios.delete()
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
      <Navbar />
      <div class="min-w-screen min-h-screen mb-[-100px] mt-[50px] flex items-center justify-center px-5 pb-10 pt-16 font-Inter">
        <div class="w-[600px] mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700">
          <div class="w-full pt-1 pb-5">
            <div class="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
              <i class="mdi mdi-credit-card-outline text-3xl"></i>
            </div>
          </div>
          <div class="mb-10">
            <h1 class="text-center font-bold text-xl uppercase">
              Booking Infomations
            </h1>
            <div className="flex justify-center items-center text-center mt-5">
              <ul>
                {getBookData.map((val) => {
                  return (
                    <>
                      <li>Booked on Room : {val.r_room}</li>
                      <li>Room Type : {val.r_type}</li>
                      <li> per night : {val.r_price}</li>
                      <li>Total guest : {val.b_guest}</li>
                      <li>Booked for {val.duration} night</li>
                      <li className="font-bold">Total : {val.total_cost} B</li>
                    </>
                  );
                })}
              </ul>
            </div>
          </div>
          <div class="mb-10">
            <h1 class="text-center font-bold text-xl uppercase">
              Secure payment info
            </h1>
          </div>
          <div class="mb-3 flex -mx-2">
            <div class="px-2">
              <label for="type1" class="flex items-center cursor-pointer">
                <input
                  type="radio"
                  class="form-radio h-5 w-5 text-indigo-500"
                  name="type"
                  id="type1"
                  checked
                  required
                />
                <img
                  src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                  class="h-8 ml-3"
                />
              </label>
            </div>
            <div class="px-2">
              <label for="type2" class="flex items-center cursor-pointer">
                <input
                  type="radio"
                  class="form-radio h-5 w-5 text-indigo-500"
                  name="type"
                  id="type2"
                  required
                />
                <img
                  src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png"
                  class="h-8 ml-3"
                />
              </label>
            </div>
          </div>
          <div class="mb-3">
            <label class="font-bold text-sm mb-2 ml-1">Name on card</label>
            <div>
              <input
                class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="John Smith"
                type="text"
                required
              />
            </div>
          </div>
          <div class="mb-3">
            <label class="font-bold text-sm mb-2 ml-1">Card number</label>
            <div>
              <input
                class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="0000 0000 0000 0000"
                type="text"
                required
              />
            </div>
          </div>
          <div class="mb-3 -mx-2 flex items-end">
            <div class="px-2 w-1/2">
              <label class="font-bold text-sm mb-2 ml-1">Expiration date</label>
              <div>
                <select required class="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                  <option value="01">01 - January</option>
                  <option value="02">02 - February</option>
                  <option value="03">03 - March</option>
                  <option value="04">04 - April</option>
                  <option value="05">05 - May</option>
                  <option value="06">06 - June</option>
                  <option value="07">07 - July</option>
                  <option value="08">08 - August</option>
                  <option value="09">09 - September</option>
                  <option value="10">10 - October</option>
                  <option value="11">11 - November</option>
                  <option value="12">12 - December</option>
                </select>
              </div>
            </div>
            <div class="px-2 w-1/2">
              <select required class="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
              </select>
            </div>
          </div>
          <div class="mb-10">
            <label class="font-bold text-sm mb-2 ml-1">Security code</label>
            <div>
              <input
                class="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="000"
                type="text"
                required
              />
            </div>
          </div>
          <div>
            <button onClick={handleOnsubmit} class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
              <i class="mdi mdi-lock-outline mr-1"></i> PAY NOW
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Payment;
