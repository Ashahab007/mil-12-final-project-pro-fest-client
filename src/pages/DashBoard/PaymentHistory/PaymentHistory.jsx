import React from "react";
import UseAuth from "../../../hooks/UseAuth/UseAuth";
import useAxiosSecure from "../../../hooks/UseAuth/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

// 21.17.12 my requirement is Creates the payment history component to show the payment history by user email

const PaymentHistory = () => {
  const { user, loading, setLoading } = UseAuth();
  const axiosSecure = useAxiosSecure();

  // 21.17.14 query by user email using tanstack query

  const { isPending, data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isPending) {
    return loading;
  }
  return (
    <div className="overflow-x-auto w-full">
      {payments?.length > 0 ? (
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th>#</th>
              <th>Parcel ID</th>
              <th>User Email</th>
              <th>Amount (৳)</th>
              <th>Method</th>

              <th>Transaction ID</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td className="break-words max-w-[120px]">
                  {payment.parcelId}
                </td>
                <td>{payment.email}</td>
                <td>{payment.amount}</td>
                <td>
                  {Array.isArray(payment.paymentMethod)
                    ? payment.paymentMethod.join(", ")
                    : payment.paymentMethod}
                </td>

                <td className="break-words max-w-[150px]">
                  {payment.transactionId}
                </td>
                <td>{format(new Date(payment.paymentTime), "PPpp")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-8 text-gray-500 font-medium">
          No payment data found.
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
