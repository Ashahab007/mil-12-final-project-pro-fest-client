import React from "react";
import UseAuth from "../../../hooks/UseAuth/UseAuth";
import useAxiosSecure from "../../../hooks/UseAuth/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

// 36.0 my requirement is only rider can see his pending deliveries and protect the route as like as AdminRoutes
const PendingDeliveries = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  //36.5 Fetch assigned parcels
  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assignedParcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/parcel?email=${user.email}`);
      return res.data;
    },
  });

  //36.6 Mutation to update delivery status
  const statusMutation = useMutation({
    // 40.5 add trackingId, riderName, riderEmail
    mutationFn: async ({
      parcelId,
      status,
      trackingId,
      riderName,
      riderEmail,
    }) => {
      const res = await axiosSecure.patch(
        `/parcels/${parcelId}/update-status`,
        {
          delivery_status: status,
          tracking_id: trackingId,
          assign_rider_name: riderName,
          assign_rider_email: riderEmail,
        }
      );
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "Status updated", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error", "Failed to update status", "error");
    },
  });

  // 36.7
  const handleStatusChange = (parcel) => {
    let nextStatus = null;
    if (parcel.delivery_status === "Assigned") nextStatus = "In-Transit";
    else if (parcel.delivery_status === "In-Transit") nextStatus = "Delivered";

    if (!nextStatus) return;

    Swal.fire({
      title: `Confirm status change?`,
      text: `This will update status to "${nextStatus}"`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
    }).then((result) => {
      if (result.isConfirmed) {
        // 40.6
        statusMutation.mutate({
          parcelId: parcel._id,
          status: nextStatus,
          trackingId: parcel.tracking_id,
          riderName: parcel.assign_rider_name,
          riderEmail: parcel.assign_rider_email,
        });
      }
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🚚 Pending Deliveries</h2>

      {parcels.length === 0 ? (
        <p className="text-center text-gray-500">No deliveries assigned.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-sm">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Tracking ID</th>
                <th>Title</th>
                <th>Receiver</th>
                <th>Region</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, idx) => {
                let buttonLabel = null;
                let isDisabled = false;

                if (parcel.delivery_status === "Assigned") {
                  buttonLabel = "Mark as Picked Up";
                } else if (parcel.delivery_status === "In-Transit") {
                  buttonLabel = "Mark as Delivered";
                } else {
                  buttonLabel = "Delivered";
                  isDisabled = true;
                }

                return (
                  <tr key={parcel._id}>
                    <td>{idx + 1}</td>
                    <td>{parcel.tracking_id}</td>
                    <td>{parcel.parcelTitle}</td>
                    <td>{parcel.receiverName}</td>
                    <td>{parcel.receiverRegion}</td>
                    <td>
                      <span
                        className={`badge ${
                          parcel.delivery_status === "Delivered"
                            ? "badge-success"
                            : parcel.delivery_status === "In-Transit"
                            ? "badge-info"
                            : "badge-warning"
                        }`}
                      >
                        {parcel.delivery_status}
                      </span>
                    </td>
                    <td className="text-right">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleStatusChange(parcel)}
                        disabled={isDisabled}
                      >
                        {buttonLabel}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingDeliveries;
