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
      { path: "riders/pending", Component: PendingRiders },
      { path: "riders/approved", Component: ApprovedRiders },
      // 21.18.1
      { path: "track", Component: TrackPackage },
      { path: "adminManager", Component: AdminManager },
    ],
  },
]);
