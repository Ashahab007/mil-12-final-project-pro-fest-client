import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/UseAuth/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAuth from "../../../hooks/UseAuth/UseAuth";

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);
  const { loading } = UseAuth();

  const {
    data: riders = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["pendingRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });

  if (isPending) {
    return loading;
  }

  const updateStatus = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/riders/${id}`, { status });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", `Rider ${status}!`, "success");
        refetch();
      }
    } catch {
      Swal.fire("Error", "Failed to update status.", "error");
    }
  };

  const openModal = (rider) => {
    setSelectedRider(rider);
    document.getElementById("rider-info-modal").showModal();
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📝 Pending Rider Applications</h2>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : riders.length === 0 ? (
        <p className="text-center text-gray-500">No pending riders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-sm">
            <thead className="bg-base-200 text-xs uppercase">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Region</th>
                <th>District</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {riders.map((rider, index) => (
                <tr key={rider._id}>
                  <td>{index + 1}</td>
                  <td>{rider.name}</td>
                  <td>{rider.phone}</td>
                  <td>{rider.region}</td>
                  <td>{rider.district}</td>
                  <td>
                    <span className="badge badge-warning">{rider.status}</span>
                  </td>
                  <td className="flex gap-2 justify-end">
                    {/* View button */}
                    <button
                      onClick={() => openModal(rider)}
                      className="btn btn-xs btn-info"
                    >
                      View
                    </button>

                    {/* Dropdown */}
                    <div className="dropdown dropdown-end">
                      <label tabIndex={0} className="btn btn-xs btn-neutral">
                        Change Status
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
                      >
                        <li>
                          <button
                            onClick={() => updateStatus(rider._id, "Approved")}
                            className="text-green-600"
                          >
                            Approve
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => updateStatus(rider._id, "Rejected")}
                            className="text-red-600"
                          >
                            Reject
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for rider details */}
      <dialog id="rider-info-modal" className="modal">
        <div className="modal-box max-w-xl">
          <h3 className="font-bold text-lg mb-4">
            👤 Rider: {selectedRider?.name}
          </h3>
          {selectedRider && (
            <div className="space-y-2 text-sm">
              <p>
                <strong>Email:</strong> {selectedRider.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedRider.phone}
              </p>
              <p>
                <strong>Age:</strong> {selectedRider.age}
              </p>
              <p>
                <strong>Region:</strong> {selectedRider.region}
              </p>
              <p>
                <strong>District:</strong> {selectedRider.district}
              </p>
              <p>
                <strong>NID:</strong> {selectedRider.nid}
              </p>
              <p>
                <strong>Bike Brand:</strong> {selectedRider.bikeBrand}
              </p>
              <p>
                <strong>Bike Reg No:</strong> {selectedRider.bikeRegNumber}
              </p>
              <p>
                <strong>Extra Info:</strong> {selectedRider.extraInfo || "N/A"}
              </p>
              <p>
                <strong>Status:</strong> {selectedRider.status}
              </p>
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PendingRiders;

/* const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: riders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pendingRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    try {
      const res = await axiosSecure.patch(`/riders/${id}`, {
        status: "Approved",
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Rider status updated to Approved!", "success");
        refetch();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update status.", "error");
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📝 Pending Rider Applications</h2>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : riders.length === 0 ? (
        <p className="text-center text-gray-500">No pending riders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-sm">
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
              {riders.map((rider, index) => (
                <tr key={rider._id}>
                  <td>{index + 1}</td>
                  <td>{rider.name}</td>
                  <td>{rider.phone}</td>
                  <td>{rider.region}</td>
                  <td>{rider.district}</td>
                  <td>
                    <span
                      className={`badge ${
                        rider.status === "Pending"
                          ? "badge-warning"
                          : "badge-success"
                      }`}
                    >
                      {rider.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => handleApprove(rider._id)}
                      className="btn btn-xs btn-success"
                      disabled={rider.status === "Approved"}
                    >
                      Approve
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

export default PendingRiders;
 */
