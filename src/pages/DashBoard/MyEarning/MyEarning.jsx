import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/UseAuth/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth/UseAuth";
import { format } from "date-fns";

const MyEarning = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  // 39.0 my requirement is rider can see his total earning, cashed out amount, pending cashout from completed Deliveries

  // 39.3
  const {
    data: deliveries = [],
    isLoading,
    isError,
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

  const calculateEarning = (d) => {
    const isSameRegion = d.senderRegion === d.receiverRegion;
    const percentage = isSameRegion ? 0.8 : 0.3;
    return Math.round(d.totalCost * percentage);
  };

  const totalEarning = deliveries.reduce(
    (sum, d) => sum + calculateEarning(d),
    0
  );

  const cashedOutDeliveries = deliveries.filter((d) => d.cashed_out);
  const totalCashedOut = cashedOutDeliveries.reduce(
    (sum, d) => sum + calculateEarning(d),
    0
  );

  const todayStr = format(new Date(), "yyyy-MM-dd");
  const todaysCashedOutDeliveries = cashedOutDeliveries.filter(
    (d) =>
      d.cashed_out_date &&
      format(new Date(d.cashed_out_date), "yyyy-MM-dd") === todayStr
  );
  const todaysEarning = todaysCashedOutDeliveries.reduce(
    (sum, d) => sum + calculateEarning(d),
    0
  );

  const pendingDeliveries = deliveries.filter((d) => !d.cashed_out);
  const totalPending = totalEarning - totalCashedOut;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">Failed to load earnings</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center">💼 My Earnings</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded-lg text-center shadow">
          <h3 className="text-lg font-semibold">Total Earnings</h3>
          <p className="text-2xl font-bold text-green-700">৳{totalEarning}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg text-center shadow">
          <h3 className="text-lg font-semibold">Cashed Out</h3>
          <p className="text-2xl font-bold text-blue-700">৳{totalCashedOut}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg text-center shadow">
          <h3 className="text-lg font-semibold">Pending</h3>
          <p className="text-2xl font-bold text-yellow-700">৳{totalPending}</p>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h3 className="text-xl font-semibold mb-3">📊 Analytics</h3>
        <ul className="list-disc ml-6 text-gray-700 space-y-1">
          <li>
            <strong>Today's Earnings (Cashed Out):</strong> ৳{todaysEarning}
          </li>
          <li>
            <strong>Total Parcels Delivered:</strong> {deliveries.length}
          </li>
          <li>
            <strong>Cashed Out Deliveries:</strong> {cashedOutDeliveries.length}
          </li>
          <li>
            <strong>Pending Deliveries:</strong> {pendingDeliveries.length}
          </li>
        </ul>
      </div>

      {/* Optional Table Breakdown */}
      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h3 className="text-lg font-semibold mb-4">📦 Parcel Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-sm">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Tracking ID</th>
                <th>Parcel</th>
                <th>Receiver</th>
                <th>Cost</th>
                <th>Earning</th>
                <th>Status</th>
                <th>Cashout Date</th>
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
                    <td>৳{parcel.totalCost}</td>
                    <td>৳{earning}</td>
                    <td>
                      {parcel.cashed_out ? (
                        <span className="badge badge-success">Cashed Out</span>
                      ) : (
                        <span className="badge badge-warning">Pending</span>
                      )}
                    </td>
                    <td>
                      {parcel.cashed_out_date
                        ? format(new Date(parcel.cashed_out_date), "PPP")
                        : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyEarning;
