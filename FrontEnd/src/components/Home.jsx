import React from "react";
import Navbar from "./Navbar";
import BookingIntro from "./BookingIntro";
import PopularDestinations from "./PopularDestinations";
import Reviews from "./Reviews";
import Footer from "./Footer";

function Home() {
  return (
    <div>
        <Navbar/>
        <BookingIntro/>
        <PopularDestinations/>
        <Reviews/>
        <Footer/>
    </div>
  );
}

export default Home;
