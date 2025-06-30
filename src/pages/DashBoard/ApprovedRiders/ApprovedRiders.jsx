import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/UseAuth/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

// 28.0 my requirement is show the approved rider in ui
const ApprovedRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");

  // ✅ FETCH from /riders/approved
  const {
    data: approvedRiders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["approvedRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/approved");
      return res.data;
    },
  });

  /* const handleDeactivate = async (id) => {
    try {
      const res = await axiosSecure.patch(`/riders/${id}`, {
        status: "Deactivated",
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Rider deactivated", "success");
        refetch();
      }
    } catch {
      Swal.fire("Error", "Failed to deactivate", "error");
    }
  }; */

  const handleDeactivate = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This rider will be deactivated.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, deactivate",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/riders/${id}`, {
          status: "Deactivated",
        });
        if (res.data.modifiedCount > 0) {
          await Swal.fire(
            "Deactivated!",
            "The rider has been deactivated.",
            "success"
          );
          refetch();
        } else {
          Swal.fire("Info", "No changes were made.", "info");
        }
      } catch {
        Swal.fire("Error", "Failed to deactivate rider.", "error");
      }
    }
  };

  // ✅ Filter riders by name
  const filteredRiders = approvedRiders.filter((rider) =>
    rider.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">✅ Approved Riders</h2>

      {/* 🔍 Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="input input-bordered w-full max-w-sm"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* 📊 Table */}
      {isLoading ? (
        <p>Loading...</p>
      ) : filteredRiders.length === 0 ? (
        <p className="text-center text-gray-500">No matches found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra text-sm w-full">
            <thead className="bg-base-200 text-xs uppercase">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Region</th>
                <th>District</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRiders.map((rider, index) => (
                <tr key={rider._id}>
                  <td>{index + 1}</td>
                  <td>{rider.name}</td>
                  <td>{rider.phone}</td>
                  <td>{rider.region}</td>
                  <td>{rider.district}</td>
                  <td>
                    <span className="badge badge-success">{rider.status}</span>
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => handleDeactivate(rider._id)}
                      className="btn btn-xs btn-error"
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApprovedRiders;
