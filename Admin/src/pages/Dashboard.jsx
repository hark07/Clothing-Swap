import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import API from "../api/axios";
import { toast } from "react-hot-toast";

import {
  FaUsers,
  FaBoxOpen,
  FaExchangeAlt,
  FaCheckCircle,
  FaFlag,
} from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const { data } = await API.get("/admin/dashboard");

      setStats(data.stats);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const cards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: <FaUsers />,
      bg: "bg-blue-500",
    },
    {
      title: "Total Items",
      value: stats?.totalItems || 0,
      icon: <FaBoxOpen />,
      bg: "bg-green-500",
    },
    {
      title: "Total Swaps",
      value: stats?.totalSwaps || 0,
      icon: <FaExchangeAlt />,
      bg: "bg-purple-500",
    },
    {
      title: "Completed Swaps",
      value: stats?.completedSwaps || 0,
      icon: <FaCheckCircle />,
      bg: "bg-orange-500",
    },
    {
      title: "Pending Reports",
      value: stats?.pendingReports || 0,
      icon: <FaFlag />,
      bg: "bg-red-500",
    },
  ];

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

        {loading ? (
          <div className="text-center text-lg">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">{card.title}</p>

                    <h2 className="text-3xl font-bold mt-2">{card.value}</h2>
                  </div>

                  <div
                    className={`${card.bg} text-white p-4 rounded-full text-xl`}
                  >
                    {card.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
