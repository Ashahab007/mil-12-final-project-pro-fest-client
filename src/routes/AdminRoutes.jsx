import React from "react";
import UseAuth from "../hooks/UseAuth/UseAuth";
import useUserRole from "../hooks/useUserRole";
import { Navigate } from "react-router";

// 31.5 create a private routes
const AdminRoutes = ({ children }) => {
  const { user, loading } = UseAuth();
  const { role, isLoading } = useUserRole();

  if (loading || isLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  if (!user || role !== "admin") {
    return <Navigate to="/forbidden"></Navigate>;
  }
  return children;
};

export default AdminRoutes;
