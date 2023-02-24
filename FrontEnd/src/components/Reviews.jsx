import React, { useState, useEffect } from "react";
import axios from "axios";

function Reviews() {
  const [roomReviews, getRoomReviews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/Room-Reviews")
      .then((res) => {
        getRoomReviews(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="font-Inter">
      <div className="flex justify-center items-center mt-[6.25rem]">
        <div className="review-topic w-[28.125rem] text-center">
          <p className="font-bold text-[36px] mb-[0.625rem]">Hot Destination</p>
          <span className="text-[#9CA3AF]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic natus
            modi ex iusto voluptatum id aspernatur delectus?
          </span>
        </div>
      </div>
      <div className="Review mt-[50px] flex justify-center items-center">
        {roomReviews.map((val) => {
          return (
            <div className="card-review w-[21.875rem] h-[23rem] border rounded-md mr-[50px]">
              <div className="card-img cursor-pointer w-[350px] h-[250px]">
                <img
                  src={`data:image/jpeg;base64,${val.image}`}
                  alt=""
                  className="rounded-md h-full w-full"
                />
              </div>
              <div className="review-name mt-[20px] text-[22px] pl-[15px]">
                <p>Room {val.r_room}</p>
              </div>
              <div className="review-total mt-[20px] pl-[15px]">
                <a className="cursor-pointer p-[8px] border border-green-400 text-green-400 font-bold  rounded-lg">
                  Total reviews {val.r_reviews}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Reviews;
