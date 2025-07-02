import React from "react";
import useAxiosSecure from "../../../hooks/UseAuth/useAxiosSecure";
import Swal from "sweetalert2";
import UseAuth from "../../../hooks/UseAuth/UseAuth";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

// 34.0 my requirement is assign parcel from parcel collections that are paid but delivery_status pending

// 35.0 my requirement is assign the parcel to the specific region rider and update the delivery status
const AssignRider = () => {
  const { loading, user } = UseAuth();
  const axiosSecure = useAxiosSecure();
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

  const handleAssign = (parcelId) => {
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

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        📦 Assign Rider to Paid Parcels
      </h2>

      {parcels.length === 0 ? (
        <p className="text-center text-gray-500">
          No assignable parcels found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-sm">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Tracking ID</th>
                <th>Parcel Title</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>From → To</th>
                <th>Weight</th>
                <th>Cost</th>
                <th>Created At</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <td>{index + 1}</td>
                  <td>{parcel.tracking_id}</td>
                  <td>{parcel.parcelTitle}</td>
                  <td>{parcel.senderName}</td>
                  <td>{parcel.receiverName}</td>
                  <td>
                    <span>{parcel.senderRegion}</span>
                    <span className="block text-xs text-gray-500">
                      → {parcel.receiverRegion}
                    </span>
                  </td>
                  <td>{parcel.parcelWeight} kg</td>
                  <td>৳{parcel.totalCost}</td>
                  <td>{format(new Date(parcel.creation_date), "PPP")}</td>
                  <td>
                    <span className="badge badge-warning">Pending</span>
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => handleAssign(parcel._id)}
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
      )}
    </div>
  );
};

export default AssignRider;
