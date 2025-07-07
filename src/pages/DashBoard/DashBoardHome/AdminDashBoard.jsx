import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// 42.3 show the data in ui
import {
  FaClipboardList,
  FaUserTie,
  FaTruck,
  FaCheckCircle,
  FaQuestionCircle,
} from "react-icons/fa";

import Loading from "../../../components/Loading/Loading";
import useAxiosSecure from "../../../hooks/UseAuth/useAxiosSecure";

const statusColors = {
  Submitted: "bg-blue-100 text-blue-600",
  Assigned: "bg-yellow-100 text-yellow-600",
  "In-Transit": "bg-orange-100 text-orange-600",
  Delivered: "bg-green-100 text-green-600",
};

const statusIcons = {
  Submitted: <FaClipboardList size={30} />,
  Assigned: <FaUserTie size={30} />,
  "In-Transit": <FaTruck size={30} />,
  Delivered: <FaCheckCircle size={30} />,
};

// 42.4 show pie chart in ui
const COLORS = {
  Submitted: "#60A5FA", // blue-400
  Assigned: "#FACC15", // yellow-400
  "In-Transit": "#FB923C", // orange-400
  Delivered: "#4ADE80", // green-400
  Default: "#D1D5DB", // gray-300
};

const AdminDashBoard = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: statusList = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["statusCounts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcel/delivery/status-count");
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  if (isError)
    return (
      <div className="text-center py-10 text-red-600 font-semibold">
        Error fetching data
      </div>
    );

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4">
        {statusList.map(({ status, count }) => {
          const colorClass =
            statusColors[status] || "bg-gray-100 text-gray-700";
          const Icon = statusIcons[status] || <FaQuestionCircle size={30} />;

          return (
            <div
              key={status}
              className={`card shadow-md p-6 flex flex-col items-center justify-center ${colorClass}`}
            >
              <div className="mb-3">{Icon}</div>
              <h2 className="card-title capitalize text-lg">{status}</h2>
              <p className="text-4xl font-extrabold">{count}</p>
            </div>
          );
        })}
      </div>
      {/* Pie Chart */}
      <div className="w-full px-4 py-6">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
          Parcel Delivery Status Overview
        </h2>

        <div className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusList}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius="80%"
                label={({ status, percent }) =>
                  `${status} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {statusList.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[entry.status] || COLORS.Default}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
