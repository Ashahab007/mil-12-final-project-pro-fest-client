import React from "react";
import { Outlet } from "react-router";
import NavBar from "../shared/NavBar/NavBar";
import Footer from "../shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
