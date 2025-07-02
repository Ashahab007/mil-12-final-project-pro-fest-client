import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import Coverage from "../pages/Coverage/Coverage";
import PrivateRoutes from "../routes/PrivateRoutes";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashBoardLayout from "../layouts/DashBoardLayout";
import MyParcel from "../pages/DashBoard/MyParcel/MyParcel";
import Payment from "../pages/DashBoard/Payment/Payment/Payment";
import PaymentHistory from "../pages/DashBoard/PaymentHistory/PaymentHistory";
import TrackPackage from "../pages/DashBoard/TrackPackage/TrackPackage";
import BeARider from "../pages/BeARider/BeARider";
import PendingRiders from "../pages/DashBoard/PendingRiders/PendingRiders";
import ApprovedRiders from "../pages/DashBoard/ApprovedRiders/ApprovedRiders";
import AdminManager from "../pages/DashBoard/AdminManager/AdminManager";
import ForbiddenPage from "../pages/ForbiddenPage/ForbiddenPage";
import AdminRoutes from "../routes/AdminRoutes";
import AssignRider from "../pages/DashBoard/AssignRider/AssignRider";

// 31.8 but problem is if u  paste the url "http://localhost:3000/riders/pending" or any of the AdminRoutes url u can see the data so to prevent this we will use verifyFBToken from the sever side
export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      // 11.1 created a route
      {
        path: "/addParcel",
        element: (
          <PrivateRoutes>
            <SendParcel></SendParcel>
          </PrivateRoutes>
        ),
        loader: () => fetch("/warehouses.json"),
      },
      {
        path: "/coverage",
        Component: Coverage,
        // 10.4 fetch the json data of the districts
        loader: () => fetch("/warehouses.json"),
      },
      // 31.6 created a forbidden routes
      {
        path: "/forbidden",
        Component: ForbiddenPage,
      },
      // 26.0 now my requirement is implementing application to be a rider
      {
        path: "/beARider",
        element: (
          <PrivateRoutes>
            <BeARider></BeARider>
          </PrivateRoutes>
        ),
        loader: () => fetch("/warehouses.json"),
      },
    ],
  },
  // 3.2 created a different route for authentication because layout don't contains any NavBar and footer
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  // 15.2 created a route for dashboard
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoutes>
    ),
    // 15.5 set the children MyParcel
    children: [
      { path: "myParcel", Component: MyParcel },
      // 21.6.1 created a route
      { path: "payment/:parcelId", Component: Payment },
      // 21.17.13 created route
      { path: "paymentHistory", Component: PaymentHistory },

      {
        path: "riders/pending",
        // 31.7.1 wrap with AdminRoutes
        element: (
          <AdminRoutes>
            <PendingRiders></PendingRiders>
          </AdminRoutes>
        ),
      },
      // 31.7.2 wrap with AdminRoutes
      {
        path: "riders/approved",
        element: (
          <AdminRoutes>
            <ApprovedRiders></ApprovedRiders>
          </AdminRoutes>
        ),
      },
      // 34.2 created a route
      {
        path: "riders/assign",
        element: (
          <AdminRoutes>
            <AssignRider></AssignRider>
          </AdminRoutes>
        ),
      },
      // 21.18.1
      { path: "track", Component: TrackPackage },
      // 31.7 wrap with AdminRoutes
      {
        path: "adminManager",
        element: (
          <AdminRoutes>
            <AdminManager></AdminManager>
          </AdminRoutes>
        ),
      },
    ],
  },
]);
