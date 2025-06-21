import React from "react";
import { Outlet } from "react-router";
import auth_image from "../assets/authImage.png";
import ProFast from "../shared/ProFast/ProFast";

const AuthLayout = () => {
  // 3.0 My requirement is creating a auth layout as my authentication contains login, sign up, forget password, reset password
  return (
    <div className="bg-base-200 min-h-screen">
      <ProFast></ProFast>
      <div className="flex justify-center items-center flex-col lg:flex-row-reverse">
        <div className="flex-1">
          <img src={auth_image} />
        </div>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
