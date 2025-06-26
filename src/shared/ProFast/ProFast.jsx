import React from "react";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router";

const ProFast = () => {
  return (
    <NavLink to="/">
      <div className="flex items-end">
        <img className="ml-2" src={logo} />
        <p className="font-extrabold text-2xl -ml-2.5 ">Profast</p>
      </div>
    </NavLink>
  );
};

export default ProFast;
