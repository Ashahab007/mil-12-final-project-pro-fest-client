import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../../../assets/banner/banner1.png";
import banner2 from "../../../assets/banner/banner2.png";
import banner3 from "../../../assets/banner/banner3.png";
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      transitionTime={2000}
      showThumbs={false}
    >
      <div>
        <img src={banner1} />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src={banner2} />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src={banner3} />
        <p className="legend">Legend 1</p>
      </div>
    </Carousel>
  );
};

export default Banner;
