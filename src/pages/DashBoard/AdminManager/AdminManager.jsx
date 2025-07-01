import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/UseAuth/useAxiosSecure";

// 30.2 Create component
const AdminManager = () => {
  const axiosSecure = useAxiosSecure();
  const [searchEmail, setSearchEmail] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);

  const {
    data: users = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userSearch", searchEmail, triggerSearch],
    enabled: !!searchEmail,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search?email=${searchEmail}`);
      return res.data;
    },
  });

  const handleRoleUpdate = async (email, role) => {
    const isPromote = role === "admin";

    // Step 1: Confirm action
    const confirm = await Swal.fire({
      title: isPromote ? "Make Admin?" : "Remove Admin?",
      text: isPromote
        ? "This user will be granted admin privileges."
        : "This user will lose admin privileges.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: isPromote ? "#16a34a" : "#dc2626", // green/red
      cancelButtonColor: "#6b7280",
      confirmButtonText: isPromote ? "Yes, promote" : "Yes, remove",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.patch("/users/role", { email, role });
      if (res.data.modifiedCount > 0) {
        await Swal.fire(
          "Success!",
          isPromote
            ? "User has been made an admin."
            : "User's admin access has been removed.",
          "success"
        );
        refetch();
      } else {
        Swal.fire("Info", "No changes made.", "info");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-6">🛡️ Admin Manager</h2>

        {/* 🔍 Search bar */}
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="Search user by email..."
            className="input input-bordered w-80"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={() => setTriggerSearch(!triggerSearch)}
          >
            Search
          </button>
        </div>

        {/* 📋 Table */}
        <div className="overflow-x-auto min-h-[300px]">
          {isLoading ? (
            <p>Searching...</p>
          ) : error || users.length === 0 ? (
            <p className="text-center text-gray-500">
              No matching users found.
            </p>
          ) : (
            <table className="table table-zebra w-full text-sm">
              <thead className="bg-base-200 text-xs uppercase">
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Created At</th>
                  <th>Role</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.email}>
                    <td>{index + 1}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.created_at
                        ? new Date(user.created_at).toLocaleString()
                        : "N/A"}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          user.role === "admin"
                            ? "badge-success"
                            : "badge-neutral"
                        }`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>
                    <td className="text-right">
                      {user.role !== "admin" ? (
                        <button
                          className="btn btn-xs btn-success"
                          onClick={() => handleRoleUpdate(user.email, "admin")}
                        >
                          Make Admin
                        </button>
                      ) : (
                        <button
                          className="btn btn-xs btn-error"
                          onClick={() => handleRoleUpdate(user.email, "user")}
                        >
                          Remove Admin
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminManager;
