import React from "react";
import amazon from "../../../assets/brands/amazon.png";
import amazon_vector from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import startPeople from "../../../assets/brands/start-people 1.png";
import start from "../../../assets/brands/start.png";
import Marquee from "react-fast-marquee";

const BrandSlider = () => {
  const brandLogos = [
    start,
    startPeople,
    randstad,
    moonstar,
    casio,
    amazon_vector,
    amazon,
  ];
  return (
    <div className="bg-white py-10">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-16">
          We've helped thousands of
          <span className="text-blue-600 pl-2">sales teams</span>
        </h2>

        <Marquee pauseOnHover={true} speed={50} gradient={false}>
          {brandLogos.map((logo, index) => (
            <div
              key={index}
              className="mx-16 flex items-center r justify-center bg-gray-100 p-4 rounded-2xl"
            >
              <img
                src={logo}
                alt="brandLogos"
                className="h-6 sm:h-8  object-center"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default BrandSlider;
