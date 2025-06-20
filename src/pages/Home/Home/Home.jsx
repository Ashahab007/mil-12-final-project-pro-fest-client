import React from "react";

import Services from "../Services/Services";
import Banner from "../Banner/Banner";
import BrandSlider from "../BrandSlider/BrandSlider";
import Benefits from "../../Benefits/Benefits";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Services></Services>
      <BrandSlider></BrandSlider>
      <Benefits></Benefits>
    </div>
  );
};

export default Home;
