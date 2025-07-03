import React from "react";
import UseAuth from "../hooks/UseAuth/UseAuth";
import useUserRole from "../hooks/useUserRole";

// 36.2 create a RiderRoutes as like as AdminRoutes
const RiderRoutes = ({ children }) => {
  const { user, loading } = UseAuth();
  const { role, isLoading } = useUserRole();

  if (loading || isLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  if (!user || role !== "rider") {
    return <Navigate to="/forbidden"></Navigate>;
  }
  return children;
};

export default RiderRoutes;
