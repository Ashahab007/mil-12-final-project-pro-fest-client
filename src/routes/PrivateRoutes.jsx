import React from "react";
import UseAuth from "../hooks/UseAuth/UseAuth";
import { Navigate, useLocation } from "react-router";

//20.0 Our requirement is redirect the user where user clicked a private route before login (not working)

// 9.0 my requirement is create a private route that if the user is not logged in it will redirect to the login page
const PrivateRoutes = ({ children }) => {
  // 9.1 call the user and loading from custom hook UseAuth
  const { user, loading } = UseAuth();

  // 20.1
  const location = useLocation();
  console.log(location);
  /*  const from = location.pathname;
  console.log(from); */

  // 9.2 show loading
  if (loading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  // 9.3 if user is not present it will redirect to login page
  if (!user) {
    return (
      // 20.2 use from to get which route i am try to go
      <Navigate state={location.pathname} to="/login"></Navigate>
    );
  }
  return children;
};

export default PrivateRoutes;
