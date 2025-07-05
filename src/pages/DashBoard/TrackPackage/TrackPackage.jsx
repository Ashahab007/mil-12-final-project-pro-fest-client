import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/UseAuth/useAxiosSecure";

// 40.12
const statusColors = {
  Submitted: "badge-info",
  "Payment Confirmed": "badge-warning",
  "Rider Assigned": "badge-accent",
  "In-Transit": "badge-secondary",
  Delivered: "badge-success",
};

const TrackPackage = () => {
  const { trackingId } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: logs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trackingHistory", trackingId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/track/${trackingId}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="p-6">Loading tracking info...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Failed to load tracking history.</p>;

  const latestStatus =
    logs.length > 0 ? logs[logs.length - 1].status : "Unknown";

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📍 Parcel Tracking</h2>

      {/* Latest Status Badge */}
      <div className="mb-6 text-lg">
        Current Status:
        <span
          className={`ml-2 badge ${
            statusColors[latestStatus] || "badge-outline"
          }`}
        >
          {latestStatus}
        </span>
      </div>

      <ul className="timeline timeline-vertical">
        {logs.map((log, idx) => (
          <li key={idx}>
            <div className="timeline-start text-sm text-gray-500">
              {log.timestamp}
            </div>
            <div className="timeline-middle">
              <div
                className={`badge ${
                  statusColors[log.status] || "badge-outline"
                }`}
              ></div>
            </div>
            <div className="timeline-end text-base font-semibold">
              {log.status}
              {/* Add rider name if available for rider actions */}
              {log.actor?.type === "rider" && log.actor?.name && (
                <div className="text-sm text-gray-600 mt-1">
                  Handled by Rider:{" "}
                  <span className="font-medium">{log.actor.name}</span>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackPackage;
