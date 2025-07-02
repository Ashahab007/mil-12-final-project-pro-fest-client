import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/UseAuth/useAxiosSecure";
import Swal from "sweetalert2";
import UseAuth from "../../../hooks/UseAuth/UseAuth";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

// 34.0 my requirement is assign parcel from parcel collections that are paid but delivery_status pending

const AssignRider = () => {
  const { loading, user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  // 35.1
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [selectedRider, setSelectedRider] = useState(null);

  const {
    data: parcels = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["assignableParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?email=${user.email}&status=assignable`
      );
      return res.data;
    },
  });

  // 35.3
  const { data: riders = [], isLoading: loadingRiders } = useQuery({
    queryKey: ["riders", selectedParcel?.receiverRegion],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?district=${selectedParcel.receiverRegion}`
      );
      return res.data;
    },
  });

  const handleAssign = () => {
    Swal.fire({
      title: "Assign Rider",
      text: "This feature is under development.",
      icon: "info",
      confirmButtonText: "OK",
    });
  };

  if (isLoading) return loading;

  if (isError)
    return <p className="p-4 text-red-500">Failed to load parcels</p>;

  // 35.2
  const handleOpenModal = (parcel) => {
    setSelectedParcel(parcel);
    setSelectedRider(null);
  };
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        📦 Assign Rider to Paid Parcels
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-sm">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Tracking ID</th>
              <th>Parcel Title</th>
              <th>From → To</th>
              <th>Cost</th>
              <th>Created At</th>
              <th>Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, idx) => (
              <tr key={parcel._id}>
                <td>{idx + 1}</td>
                <td>{parcel.tracking_id}</td>
                <td>{parcel.parcelTitle}</td>
                <td>
                  {parcel.senderRegion} → {parcel.receiverRegion}
                </td>
                <td>৳{parcel.totalCost}</td>
                <td>{format(new Date(parcel.creation_date), "PPP")}</td>
                <td>
                  <span className="badge badge-warning">Pending</span>
                </td>
                <td className="text-right">
                  <button
                    onClick={() => handleOpenModal(parcel)}
                    className="btn btn-sm btn-primary"
                  >
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedParcel && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold mb-2">
              Assign Rider for {selectedParcel.tracking_id}
            </h3>
            {loadingRiders ? (
              <p>Loading riders...</p>
            ) : riders.length === 0 ? (
              <p className="text-red-500 mb-2">
                No approved riders in this district.
              </p>
            ) : (
              <select
                className="select select-bordered w-full mb-4"
                onChange={(e) => setSelectedRider(e.target.value)}
              >
                <option value="">Select rider</option>
                {riders.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.name} ({r.email})
                  </option>
                ))}
              </select>
            )}
            <div className="modal-action">
              <button
                onClick={() => setSelectedParcel(null)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button onClick={handleAssign} className="btn btn-primary">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignRider;
