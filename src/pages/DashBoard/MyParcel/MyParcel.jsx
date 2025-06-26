import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAuth from "../../../hooks/UseAuth/UseAuth";
import useAxiosSecure from "../../../hooks/UseAuth/useAxiosSecure";
import { format } from "date-fns";

// 15.4 created a My Parcel component to show my parcel

// 16.0 my requirement is fetch the data using tanstack query. tanstack query is used when we update or delete the data we have to maintain state but using tanstack query this operation is easily handled. so run "npm i @tanstack/react-query"

const MyParcel = () => {
  const { user } = UseAuth();
  console.log(user);

  const axiosSecure = useAxiosSecure();

  // 16.4 use the useQuery from doc which takes some parameter by default like isPending, isError, data, error. here we will use data and set the value parcels by default is a empty array
  const { data: parcels = [] } = useQuery({
    queryKey: ["my-parcel", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });
  console.log(parcels);

  const handlePay = (parcel) => {
    console.log("Pay clicked:", parcel);
    // Logic to trigger payment
  };

  const handleView = (parcel) => {
    console.log("View clicked:", parcel);
    // Open modal or navigate to detail page
  };

  const handleDelete = (parcel) => {
    console.log("Delete clicked:", parcel);
    // Confirm and delete the parcel
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📦 My Parcels</h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full table-zebra">
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Type</th>
              <th>Creation Date</th>
              <th>Cost (৳)</th>
              <th>Payment Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels?.length > 0 ? (
              parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <td>{index + 1}</td>
                  <td>{parcel.parcelTitle}</td>
                  <td className="capitalize">{parcel.parcelType}</td>
                  <td>{format(new Date(parcel.creation_date), "PPpp")}</td>
                  <td>{parcel.totalCost}</td>
                  <td>
                    <span
                      className={`badge px-3 py-1 text-white font-medium ${
                        parcel.payment_status === "Paid"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {parcel.payment_status}
                    </span>
                  </td>
                  <td className="flex flex-wrap gap-2 justify-center">
                    <button
                      className="btn btn-xs btn-outline btn-primary"
                      onClick={() => onPay(parcel)}
                    >
                      Pay
                    </button>
                    <button
                      className="btn btn-xs btn-outline btn-info"
                      onClick={() => onView(parcel)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-xs btn-outline btn-error"
                      onClick={() => onDelete(parcel)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No parcels found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* <ParcelTable
        parcels={parcels}
        onPay={handlePay}
        onView={handleView}
        onDelete={handleDelete}
      /> */}
    </div>
  );
};

export default MyParcel;
