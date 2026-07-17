import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  MapPin,
  Heart,
  Share2,
  ShieldCheck,
  Eye,
  Calendar,
  Tag,
} from "lucide-react";

import toast from "react-hot-toast";
import API from "../api/axios";

const ItemDetails = () => {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [myItems, setMyItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [loading, setLoading] = useState(true);

  // Report Modal States
  const [showReportModal, setShowReportModal] = useState(false);

  const [reportData, setReportData] = useState({
    reason: "",
    description: "",
  });

  useEffect(() => {
    fetchItem();
    fetchMyItems();
  }, []);

  const fetchItem = async () => {
    try {
      const { data } = await API.get(`/items/${id}`);
      setItem(data.item);
    } catch (error) {
      toast.error("Failed to load item");
    }
  };

  const fetchMyItems = async () => {
    try {
      const { data } = await API.get("/items/my-items");

      const availableItems = data.items.filter(
        (item) => item.status === "available",
      );

      setMyItems(availableItems);
    } catch (error) {
      toast.error("Failed to load your items");
    } finally {
      setLoading(false);
    }
  };

  // SWAP REQUEST
  const handleSwapRequest = async () => {
    if (!selectedItem) {
      toast.error("Please choose one of your items");
      return;
    }

    try {
      const toastId = toast.loading("Sending swap request...");

      await API.post("/swaps", {
        requesterItemId: selectedItem,
        receiverItemId: item._id,
      });

      toast.success("Swap request sent successfully 🎉", {
        id: toastId,
      });

      setSelectedItem("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send request");
    }
  };

  // REPORT SUBMIT
  const handleReportSubmit = async () => {
    if (!reportData.reason || !reportData.description) {
      return toast.error("Please fill all fields");
    }

    if (reportData.description.length < 10) {
      return toast.error("Description must be at least 10 characters");
    }

    try {
      const toastId = toast.loading("Submitting report...");

      await API.post("/reports", {
        reportedUser: item.owner._id,
        item: item._id,
        reason: reportData.reason,
        description: reportData.description,
      });

      toast.success("Report submitted successfully", {
        id: toastId,
      });

      setShowReportModal(false);

      setReportData({
        reason: "",
        description: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit report");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-xl font-semibold">
          Loading Item...
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Item Not Found
      </div>
    );
  }

  const imageUrl = item.images?.[0]
    ? item.images[0].startsWith("http")
      ? item.images[0]
      : `http://localhost:5000${item.images[0]}`
    : "/placeholder.png";

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* LEFT IMAGE */}

          <div>
            <div className="relative overflow-hidden rounded-3xl shadow-xl border border-gray-200 bg-white">
              <img
                src={imageUrl}
                alt={item.title}
                className="w-full h-[700px] object-cover transition duration-500 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

              {/* ACTION BUTTONS */}

              <div className="absolute top-5 right-5 flex gap-3">
                <button className="bg-white/90 backdrop-blur p-3 rounded-full shadow-lg hover:scale-110 transition">
                  <Heart size={20} />
                </button>

                <button className="bg-white/90 backdrop-blur p-3 rounded-full shadow-lg hover:scale-110 transition">
                  <Share2 size={20} />
                </button>
              </div>

              {/* BRAND */}

              <div className="absolute left-5 bottom-5">
                <span className="bg-black text-white px-5 py-2 rounded-full text-sm font-semibold">
                  {item.brand}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}

          <div className="space-y-6 lg:sticky lg:top-8 self-start">
            {/* PRODUCT CARD */}

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <p className="uppercase text-xs tracking-[4px] text-gray-500 font-semibold">
                Premium Collection
              </p>

              <h1 className="text-5xl font-black text-gray-900 mt-3">
                {item.title}
              </h1>

              {/* BADGES */}

              <div className="flex flex-wrap gap-3 mt-6">
                <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold">
                  {item.size}
                </span>

                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                  {item.condition}
                </span>

                <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">
                  {item.category}
                </span>
              </div>

              {/* DETAILS */}

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-gray-500" />
                  <span className="text-gray-700">{item.location}</span>
                </div>

                <div className="flex items-center gap-3">
                  <ShieldCheck size={18} className="text-green-600" />
                  <span>Verified Item</span>
                </div>

                <div className="flex items-center gap-3">
                  <Eye size={18} className="text-gray-500" />
                  <span>124 Views</span>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-gray-500" />
                  <span>Recently Added</span>
                </div>
              </div>

              {/* PRICE */}

              <div className="mt-10 border-t pt-8">
                <p className="text-gray-500 text-sm">Estimated Value</p>

                <h2 className="text-5xl font-black mt-2">
                  Rs. {item.estimatedValue}
                </h2>

                <p className="text-green-600 font-semibold mt-2">
                  Excellent Swap Value
                </p>
              </div>
            </div>

            {/* DESCRIPTION */}

            <div className="bg-white rounded-3xl shadow-xl border p-8">
              <h2 className="text-2xl font-bold mb-6">Product Description</h2>

              <p className="text-gray-600 leading-8">{item.description}</p>

              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                {[
                  {
                    title: "Brand",
                    value: item.brand,
                  },
                  {
                    title: "Category",
                    value: item.category,
                  },
                  {
                    title: "Size",
                    value: item.size,
                  },
                  {
                    title: "Condition",
                    value: item.condition,
                  },
                ].map((data, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-slate-50 border"
                  >
                    <p className="text-xs text-gray-500">{data.title}</p>

                    <p className="font-semibold">{data.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* OWNER */}

            <div className="bg-white rounded-3xl shadow-xl border p-8">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center text-3xl font-bold">
                  {item.owner?.name?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3 className="text-2xl font-bold">{item.owner?.name}</h3>

                  <p className="text-gray-500">Trusted Community Member</p>
                </div>
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-5">
                <div className="border rounded-2xl p-5">
                  <p className="text-gray-500 text-sm">Email</p>

                  <p className="font-semibold break-all">{item.owner?.email}</p>
                </div>

                <div className="border rounded-2xl p-5">
                  <p className="text-gray-500 text-sm">Location</p>

                  <p className="font-semibold">{item.location}</p>
                </div>
              </div>
            </div>
            {/* SWAP REQUEST */}

            <div className="bg-white rounded-3xl shadow-xl border p-8">
              <h2 className="text-2xl font-bold">Request a Swap</h2>

              <p className="text-gray-500 mt-2">Choose one of your items.</p>

              <select
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
                className="mt-6 w-full rounded-2xl border px-5 py-4"
              >
                <option value="">Select Your Item</option>

                {myItems
                  .filter((myItem) => myItem.status === "available")
                  .map((myItem) => (
                    <option key={myItem._id} value={myItem._id}>
                      {myItem.title}
                    </option>
                  ))}
              </select>

              <button
                onClick={handleSwapRequest}
                className="mt-6 w-full bg-black text-white py-4 rounded-2xl font-semibold hover:bg-gray-900 transition"
              >
                Send Swap Request
              </button>

              <button
                onClick={() => setShowReportModal(true)}
                className="mt-3 w-full bg-red-600 text-white py-4 rounded-2xl font-semibold hover:bg-red-700 transition"
              >
                Report Item
              </button>
            </div>

            {/* SAFETY */}

            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-8 text-white">
              <h2 className="text-2xl font-bold">Swap Safely</h2>

              <div className="mt-6 space-y-4">
                <p>🛡 Meet in a public place.</p>

                <p>🛡 Inspect items before exchange.</p>

                <p>🛡 Never share passwords or financial details.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* REPORT MODAL */}

      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* HEADER */}

            <div className="bg-gradient-to-r from-red-600 to-rose-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">🚩 Report Item</h2>

                  <p className="text-red-100 mt-1">
                    Help us keep the marketplace safe.
                  </p>
                </div>

                <button
                  onClick={() => setShowReportModal(false)}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-xl"
                >
                  ×
                </button>
              </div>
            </div>

            {/* BODY */}

            <div className="p-6 space-y-5">
              <div>
                <label className="block mb-2 font-semibold">
                  Report Reason
                </label>

                <select
                  value={reportData.reason}
                  onChange={(e) =>
                    setReportData({
                      ...reportData,
                      reason: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select Reason</option>

                  <option value="Fake Item">Fake Item</option>

                  <option value="Spam">Spam</option>

                  <option value="Scam">Scam / Fraud</option>

                  <option value="Inappropriate Content">
                    Inappropriate Content
                  </option>

                  <option value="Misleading Information">
                    Misleading Information
                  </option>

                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-semibold">Description</label>

                <textarea
                  rows={5}
                  placeholder="Describe the issue in detail..."
                  value={reportData.description}
                  onChange={(e) =>
                    setReportData({
                      ...reportData,
                      description: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
                <p className="text-sm text-red-700">
                  ⚠️ False reports may result in account restrictions. Please
                  provide accurate information.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowReportModal(false)}
                  className="flex-1 py-3 border rounded-2xl font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  onClick={handleReportSubmit}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-semibold"
                >
                  Submit Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;
