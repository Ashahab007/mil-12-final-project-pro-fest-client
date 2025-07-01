import React from "react";
import { NavLink, Outlet } from "react-router";
import ProFast from "../shared/ProFast/ProFast";
import {
  FaHome,
  FaBoxOpen,
  FaHistory,
  FaMapMarkerAlt,
  FaUserEdit,
  FaUserShield,
} from "react-icons/fa";
import useUserRole from "../hooks/useUserRole";
// 15.0  now my requirement is create a dashboard so created a DashBoardLayout

const DashBoardLayout = () => {
  const { role } = useUserRole();
  console.log(role);

  return (
    // 15.1 take the design from daisy ui drawer. The sidebar will hidden for small devices and the sidebar will remain open for large devices
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">Dashboard</div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <ProFast></ProFast>
          <li>
            <NavLink to="/" className="flex items-center gap-2">
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/myParcel"
              className="flex items-center gap-2"
            >
              <FaBoxOpen /> My Parcels
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/paymentHistory"
              className="flex items-center gap-2"
            >
              <FaHistory /> Payment History
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/track" className="flex items-center gap-2">
              <FaMapMarkerAlt /> Track Your Parcel
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/update" className="flex items-center gap-2">
              <FaUserEdit /> Update Your Profile
            </NavLink>
          </li>

          {role === "admin" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/riders/pending"
                  className="flex items-center gap-2"
                >
                  <FaUserEdit /> Pending Riders
                </NavLink>
                <NavLink
                  to="/dashboard/riders/approved"
                  className="flex items-center gap-2"
                >
                  <FaUserEdit /> Approved Riders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/adminManager"
                  className="flex items-center gap-2"
                >
                  <FaUserShield /> Admin Manager
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;
