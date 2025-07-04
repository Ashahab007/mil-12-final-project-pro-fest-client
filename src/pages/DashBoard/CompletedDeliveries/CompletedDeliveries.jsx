import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/UseAuth/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth/UseAuth";
import { format } from "date-fns";
import Swal from "sweetalert2";

// 38.0 my requirement is rider can see his completed deliveries
const CompletedDeliveries = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: deliveries = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["completedDeliveries", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/completed-parcel?email=${user.email}`
      );
      return res.data;
    },
  });

  const calculateEarning = (delivery) => {
    const isSameRegion = delivery.senderRegion === delivery.receiverRegion;
    const percentage = isSameRegion ? 0.8 : 0.3;
    return Math.round(delivery.totalCost * percentage);
  };

  const totalEarnings = deliveries
    .filter((d) => !d.cashed_out)
    .reduce((sum, d) => sum + calculateEarning(d), 0);

  // Mutation for cash out
  const cashoutMutation = useMutation({
    mutationFn: async (parcelId) => {
      const res = await axiosSecure.patch(`/parcels/${parcelId}/cashout`, {
        cashed_out: true,
      });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "Cash out completed!", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error", "Cash out failed!", "error");
    },
  });
  // 38.5
  const handleCashOut = (parcelId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are requesting a cash out for this delivery.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Cash Out",
    }).then((result) => {
      if (result.isConfirmed) {
        cashoutMutation.mutate(parcelId);
      }
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">Failed to load deliveries</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">✅ Completed Deliveries</h2>
      <p className="mb-4 font-semibold text-green-600">
        Total Pending Earnings: ৳{totalEarnings}
      </p>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-sm">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Tracking ID</th>
              <th>Parcel</th>
              <th>Receiver</th>
              <th>To</th>
              <th>From</th>
              <th>Cost</th>
              <th>Earning</th>
              <th>Delivered</th>
              <th className="text-right">Cashout</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((parcel, idx) => {
              const earning = calculateEarning(parcel);
              return (
                <tr key={parcel._id}>
                  <td>{idx + 1}</td>
                  <td>{parcel.tracking_id}</td>
                  <td>{parcel.parcelTitle}</td>
                  <td>{parcel.receiverName}</td>
                  <td>{parcel.receiverRegion}</td>
                  <td>{parcel.senderRegion}</td>
                  <td>৳{parcel.totalCost}</td>
                  <td>৳{earning}</td>
                  <td>{format(new Date(parcel.creation_date), "PPP")}</td>
                  <td className="text-right">
                    {parcel.cashed_out ? (
                      <button className="btn btn-sm btn-success" disabled>
                        Cashed Out
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleCashOut(parcel._id?.$oid || parcel._id)
                        }
                        className="btn btn-sm btn-primary"
                      >
                        Cash Out
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedDeliveries;
