import React from "react";
import UseAuth from "../hooks/UseAuth/UseAuth";
import { Navigate } from "react-router";

// 9.0 my requirement is create a private route that if the user is not logged in it will redirect to the login page
const PrivateRoutes = ({ children }) => {
  // 9.1 call the user and loading from custom hook UseAuth
  const { user, loading } = UseAuth();

  // 9.2 show loading
  if (loading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  // 9.3 if user is not present it will redirect to login page
  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }
  return children;
};

export default PrivateRoutes;
