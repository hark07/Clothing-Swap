import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import API from "../api/axios";
import { toast } from "react-hot-toast";
import { FaSearch, FaExchangeAlt } from "react-icons/fa";

const Swaps = () => {
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchSwaps = async () => {
    try {
      const { data } = await API.get("/admin/swaps");

      setSwaps(data.swaps);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch swaps");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSwaps();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "accepted":
        return "bg-blue-100 text-blue-700";

      case "completed":
        return "bg-green-100 text-green-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      case "cancelled":
        return "bg-gray-100 text-gray-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredSwaps = swaps.filter((swap) => {
    const matchesSearch =
      swap.requester?.name?.toLowerCase().includes(search.toLowerCase()) ||
      swap.receiver?.name?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : swap.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalSwaps = swaps.length;

  const completedSwaps = swaps.filter(
    (swap) => swap.status === "completed",
  ).length;

  const pendingSwaps = swaps.filter((swap) => swap.status === "pending").length;

  return (
    <AdminLayout>
      <div>
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">Swaps Management</h1>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />

              <input
                type="text"
                placeholder="Search swaps..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg outline-none"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-lg px-4 py-2"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-gray-500">Total Swaps</h3>

            <h2 className="text-3xl font-bold mt-2">{totalSwaps}</h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-gray-500">Completed</h3>

            <h2 className="text-3xl font-bold mt-2 text-green-600">
              {completedSwaps}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-gray-500">Pending</h3>

            <h2 className="text-3xl font-bold mt-2 text-yellow-600">
              {pendingSwaps}
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid gap-5">
            {filteredSwaps.map((swap) => (
              <div key={swap._id} className="bg-white rounded-xl shadow p-5">
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <FaExchangeAlt />

                      <span className="font-bold">Swap Request</span>
                    </div>

                    <p>
                      <strong>Requester:</strong> {swap.requester?.name}
                    </p>

                    <p>
                      <strong>Receiver:</strong> {swap.receiver?.name}
                    </p>

                    <p>
                      <strong>Requester Item:</strong>{" "}
                      {swap.requesterItem?.title}
                    </p>

                    <p>
                      <strong>Receiver Item:</strong> {swap.receiverItem?.title}
                    </p>
                  </div>

                  <div className="flex flex-col items-start lg:items-end gap-3">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                        swap.status,
                      )}`}
                    >
                      {swap.status}
                    </span>

                    <span className="text-sm text-gray-500">
                      {new Date(swap.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredSwaps.length === 0 && (
          <div className="text-center py-10 text-gray-500">No Swaps Found</div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Swaps;
