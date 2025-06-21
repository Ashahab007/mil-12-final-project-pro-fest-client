import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  // 3.0 My requirement is creating a auth layout as my authentication contains login, sign up, forget password, reset password,
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          className="max-w-lg rounded-lg shadow-2xl"
        />
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AuthLayout;
