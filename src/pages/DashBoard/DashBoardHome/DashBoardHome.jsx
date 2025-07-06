import React from "react";
import useUserRole from "../../../hooks/useUserRole";
import Loading from "../../../components/Loading/Loading";
import UserDashBoard from "./UserDashBoard";
import RiderDashBoard from "./RiderDashBoard";
import AdminDashBoard from "./AdminDashBoard";
import ForbiddenPage from "../../ForbiddenPage/ForbiddenPage";

// 41.0 my requirement is in DashBoard create a DashBoardHome where we will show the dashboard role wise for admin, user, rider
const DashBoardHome = () => {
  // 41.2 import role from useUserRole
  const { role, isLoading } = useUserRole();

  // 41.3
  if (isLoading) {
    return <Loading></Loading>;
  }
  // 41.4.1
  if (role === "user") {
    return <UserDashBoard></UserDashBoard>;
  }

  // 41.4.2
  if (role === "rider") {
    return <RiderDashBoard></RiderDashBoard>;
  }

  // 41.4.3
  if (role === "admin") {
    return <AdminDashBoard></AdminDashBoard>;
  }
  return <ForbiddenPage></ForbiddenPage>;
};

export default DashBoardHome;
