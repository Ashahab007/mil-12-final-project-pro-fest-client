import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/UseAuth/useAxiosSecure";

// 30.2 Create component
const AdminManager = () => {
  const axiosSecure = useAxiosSecure();
  const [searchEmail, setSearchEmail] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);

  //   30.3 Search for users by partial email
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

  //30.4 Update user's role
  const handleRoleUpdate = async (email, role) => {
    try {
      const res = await axiosSecure.patch("/users/role", { email, role });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", `User role changed to ${role}`, "success");
        refetch();
      } else {
        Swal.fire("Info", "No changes made.", "info");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🔐 Manage Admin Access</h2>

      {/* Search Input */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Search user by email..."
          className="input input-bordered w-full"
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

      {/* Results */}
      {isLoading ? (
        <p>Searching...</p>
      ) : error ? (
        <p className="text-red-500">No users found.</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500">No matching users found.</p>
      ) : (
        users.map((user) => (
          <div key={user.email} className="card bg-base-100 shadow p-4 mb-4">
            <h3 className="font-semibold text-lg mb-2">👤 {user.email}</h3>
            <p>
              <strong>Created at:</strong>{" "}
              {user.created_at
                ? new Date(user.created_at).toLocaleString()
                : "N/A"}
            </p>
            <p>
              <strong>Current Role:</strong> {user.role || "user"}
            </p>

            <div className="mt-4 flex gap-2">
              {user.role !== "Admin" ? (
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => handleRoleUpdate(user.email, "Admin")}
                >
                  Make Admin
                </button>
              ) : (
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => handleRoleUpdate(user.email, "User")}
                >
                  Remove Admin
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminManager;
