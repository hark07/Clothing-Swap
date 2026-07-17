import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock3,
  MessageCircle,
  ArrowRightLeft,
} from "lucide-react";
import API from "../api/axios";

import { Toaster } from "react-hot-toast";

const statusClasses = {
  pending: "bg-amber-100 text-amber-700",
  accepted: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
  completed: "bg-indigo-100 text-indigo-700",
};

const SwapRequests = () => {
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchSwaps();
  }, []);

  const fetchSwaps = async () => {
    try {
      const { data } = await API.get("/swaps");
      setSwaps(data.swaps);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action, swapId) => {
    try {
      const { data } = await API.put(`/swaps/${swapId}/${action}`);

      toast(data.message);

      fetchSwaps();
    } catch (error) {
      console.log(error);

      toast(error.response?.data?.message || "Action failed");
    }
  };

  const pending = swaps.filter((s) => s.status === "pending").length;
  const accepted = swaps.filter((s) => s.status === "accepted").length;
  const completed = swaps.filter((s) => s.status === "completed").length;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-10 w-64 bg-gray-300 rounded mb-10"></div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-3xl h-28 shadow" />
              ))}
            </div>

            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-3xl h-56 shadow mb-6" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-5xl font-black text-gray-900">Swap Requests</h1>

            <p className="text-gray-500 mt-2">
              Manage your clothing exchange requests.
            </p>
          </div>

          <button
            onClick={fetchSwaps}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl hover:bg-gray-900 transition"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-3xl shadow-lg border p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Pending</p>

                <h2 className="text-4xl font-black mt-2">{pending}</h2>
              </div>

              <Clock3 className="text-amber-500" size={42} />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Accepted</p>

                <h2 className="text-4xl font-black mt-2">{accepted}</h2>
              </div>

              <CheckCircle2 className="text-green-600" size={42} />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Completed</p>

                <h2 className="text-4xl font-black mt-2">{completed}</h2>
              </div>

              <ArrowRightLeft className="text-indigo-600" size={42} />
            </div>
          </div>
        </div>
        {swaps.length === 0 ? (
          <div className="bg-white rounded-3xl border shadow-lg py-20 text-center">
            <ArrowRightLeft size={60} className="mx-auto text-gray-300" />

            <h2 className="text-2xl font-bold mt-6">No Swap Requests</h2>

            <p className="text-gray-500 mt-2">
              Your swap requests will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {swaps.map((swap) => {
              const isReceiver =
                String(swap.receiver?._id) === String(currentUser?._id);

              const isRequester =
                String(swap.requester?._id) === String(currentUser?._id);

              const requesterImage = swap.requesterItem?.images?.[0]
                ? swap.requesterItem.images[0].startsWith("http")
                  ? swap.requesterItem.images[0]
                  : `https://clothing-swap.onrender.com${swap.requesterItem.images[0]}`
                : "/placeholder.png";

              const receiverImage = swap.receiverItem?.images?.[0]
                ? swap.receiverItem.images[0].startsWith("http")
                  ? swap.receiverItem.images[0]
                  : `https://clothing-swap.onrender.com${swap.receiverItem.images[0]}`
                : "/placeholder.png";

              return (
                <div
                  key={swap._id}
                  className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  {/* Header */}

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-8 py-6 border-b">
                    <div>
                      <h2 className="text-2xl font-bold">Clothing Swap</h2>

                      <p className="text-gray-500 mt-1">
                        Exchange request between two users
                      </p>
                    </div>

                    <span
                      className={`px-5 py-2 rounded-full font-semibold capitalize ${statusClasses[swap.status]}`}
                    >
                      {swap.status}
                    </span>
                  </div>

                  {/* Items */}

                  <div className="grid lg:grid-cols-3 gap-8 p-8">
                    {/* Offered Item */}

                    <div className="border rounded-3xl overflow-hidden">
                      <img
                        src={requesterImage}
                        alt={swap.requesterItem?.title}
                        className="w-full h-72 object-cover hover:scale-105 transition duration-500"
                      />

                      <div className="p-5">
                        <p className="text-sm uppercase tracking-widest text-gray-400">
                          Offered Item
                        </p>

                        <h3 className="text-xl font-bold mt-2">
                          {swap.requesterItem?.title}
                        </h3>

                        <p className="text-gray-500 mt-2">
                          By {swap.requester?.name}
                        </p>
                      </div>
                    </div>

                    {/* Middle */}

                    <div className="flex flex-col justify-center items-center">
                      <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center shadow-xl">
                        <ArrowRightLeft size={36} />
                      </div>

                      <p className="font-semibold mt-5 text-gray-700">
                        Swap Requested
                      </p>
                    </div>

                    {/* Requested Item */}

                    <div className="border rounded-3xl overflow-hidden">
                      <img
                        src={receiverImage}
                        alt={swap.receiverItem?.title}
                        className="w-full h-72 object-cover hover:scale-105 transition duration-500"
                      />

                      <div className="p-5">
                        <p className="text-sm uppercase tracking-widest text-gray-400">
                          Requested Item
                        </p>

                        <h3 className="text-xl font-bold mt-2">
                          {swap.receiverItem?.title}
                        </h3>

                        <p className="text-gray-500 mt-2">
                          By {swap.receiver?.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}

                  <div className="border-t px-8 py-6">
                    <div className="flex flex-wrap gap-4 justify-end">
                      {/* Receiver Controls */}

                      {swap.status === "pending" && isReceiver && (
                        <>
                          <button
                            onClick={() => handleAction("accept", swap._id)}
                            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-semibold transition shadow-md hover:shadow-xl"
                          >
                            <CheckCircle2 size={18} />
                            Accept
                          </button>

                          <button
                            onClick={() => handleAction("reject", swap._id)}
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl font-semibold transition shadow-md hover:shadow-xl"
                          >
                            <XCircle size={18} />
                            Reject
                          </button>
                        </>
                      )}

                      {/* Requester Controls */}

                      {swap.status === "pending" && isRequester && (
                        <button
                          onClick={() => handleAction("cancel", swap._id)}
                          className="bg-gray-700 hover:bg-black text-white px-6 py-3 rounded-2xl font-semibold transition shadow-md hover:shadow-xl"
                        >
                          Cancel Request
                        </button>
                      )}

                      {/* Chat */}

                      {(swap.status === "accepted" ||
                        swap.status === "completed") && (
                        <Link
                          to={`/chat/${swap._id}`}
                          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold transition shadow-md hover:shadow-xl"
                        >
                          <MessageCircle size={18} />
                          Open Chat
                        </Link>
                      )}

                      {/* Complete */}

                      {swap.status === "accepted" && (
                        <button
                          onClick={() => handleAction("complete", swap._id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold transition shadow-md hover:shadow-xl"
                        >
                          Complete Swap
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SwapRequests;
