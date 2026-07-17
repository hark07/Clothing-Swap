import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, Repeat, Bell, Plus, MapPin, Mail, User } from "lucide-react";
import API from "../api/axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [swaps, setSwaps] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [userRes, itemsRes, swapsRes, notificationsRes] = await Promise.all(
        [
          API.get("/auth/me"),
          API.get("/items/my-items"),
          API.get("/swaps"),
          API.get("/notifications"),
        ],
      );

      setUser(userRes.data.user);
      setItems(itemsRes.data.items || []);
      setSwaps(swapsRes.data.swaps || []);
      setNotifications(notificationsRes.data.notifications || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    const confirmDelete = window.confirm("Delete this item?");

    if (!confirmDelete) return;

    try {
      await API.delete(`/items/${id}`);

      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // Image Helper
  const getImage = (images) => {
    if (!images || images.length === 0) {
      return "https://placehold.co/600x600?text=No+Image";
    }

    const image = images[0];

    if (typeof image === "object" && image?.url) {
      return image.url;
    }

    if (typeof image === "string") {
      if (image.startsWith("http://") || image.startsWith("https://")) {
        return image;
      }

      return `http://localhost:5000${image}`;
    }

    return "https://placehold.co/600x600?text=No+Image";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="animate-pulse space-y-5 w-full max-w-6xl px-6">
          <div className="h-56 bg-white rounded-3xl"></div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="h-36 bg-white rounded-3xl"></div>
            <div className="h-36 bg-white rounded-3xl"></div>
            <div className="h-36 bg-white rounded-3xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-5">
        {/* Hero */}

        <div className="rounded-3xl bg-gradient-to-r from-black via-gray-900 to-black text-white p-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6">
              <img
                src={
                  user.profileImage ||
                  `https://ui-avatars.com/api/?background=000000&color=fff&name=${user.name}`
                }
                alt={user.name}
                className="w-28 h-28 rounded-full border-4 border-white object-cover"
              />

              <div>
                <h1 className="text-4xl font-bold">Welcome, {user.name}</h1>

                <div className="space-y-2 mt-4">
                  <p className="flex items-center gap-2 text-gray-300">
                    <Mail size={18} />
                    {user.email}
                  </p>

                  <p className="flex items-center gap-2 text-gray-300">
                    <MapPin size={18} />
                    {user.location || "Nepal"}
                  </p>

                  <p className="flex items-center gap-2 text-gray-300">
                    <User size={18} />
                    Clothing Swap Member
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/add-item"
              className="bg-white text-black px-7 py-4 rounded-2xl flex items-center gap-3 font-semibold hover:scale-105 transition"
            >
              <Plus size={22} />
              Add New Item
            </Link>
          </div>
        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {/* Listings */}

          <div className="bg-white rounded-3xl p-7 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center">
              <Package size={30} className="text-emerald-600" />
            </div>

            <p className="text-gray-500 mt-5">Total Listings</p>

            <h2 className="text-5xl font-bold text-emerald-600 mt-2">
              {items.length}
            </h2>
          </div>

          {/* Swaps */}

          <div className="bg-white rounded-3xl p-7 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
              <Repeat size={30} className="text-blue-600" />
            </div>

            <p className="text-gray-500 mt-5">Total Swaps</p>

            <h2 className="text-5xl font-bold text-blue-600 mt-2">
              {swaps.length}
            </h2>
          </div>

          {/* Notifications */}

          <div className="bg-white rounded-3xl p-7 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center">
              <Bell size={30} className="text-red-500" />
            </div>

            <p className="text-gray-500 mt-5">Notifications</p>

            <h2 className="text-5xl font-bold text-red-500 mt-2">
              {notifications.length}
            </h2>
          </div>
        </div>

        {/* My Listings */}

        <div className="bg-white rounded-3xl shadow-xl mt-10 p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
            <div>
              <h2 className="text-3xl font-bold">My Listings</h2>

              <p className="text-gray-500 mt-2">
                Manage all your uploaded clothing items.
              </p>
            </div>

            <Link
              to="/add-item"
              className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-900 transition"
            >
              <Plus size={20} />
              Add Item
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="py-20 flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center">
                <Package size={48} className="text-gray-400" />
              </div>

              <h3 className="text-2xl font-bold mt-6">No Listings Yet</h3>

              <p className="text-gray-500 mt-3 max-w-md">
                Upload your first clothing item and start swapping with people.
              </p>

              <Link
                to="/add-item"
                className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl transition"
              >
                Upload First Item
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="group bg-white border rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  {/* Image */}

                  <div className="relative overflow-hidden">
                    <img
                      src={getImage(item.images)}
                      alt={item.title}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/600x600?text=No+Image";
                      }}
                      className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      {item.condition}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold line-clamp-1">
                      {item.title}
                    </h3>

                    <p className="text-gray-500 mt-2">{item.brand}</p>

                    <div className="grid grid-cols-2 gap-3 mt-5">
                      <div className="bg-slate-100 rounded-xl p-3">
                        <p className="text-xs text-gray-500">Category</p>

                        <h4 className="font-semibold">{item.category}</h4>
                      </div>

                      <div className="bg-slate-100 rounded-xl p-3">
                        <p className="text-xs text-gray-500">Size</p>

                        <h4 className="font-semibold">{item.size}</h4>
                      </div>
                    </div>

                    <div className="mt-5 bg-slate-100 rounded-xl p-3">
                      <p className="text-xs text-gray-500">Estimated Value</p>

                      <h4 className="font-bold text-emerald-600">
                        Rs. {item.estimatedValue || 0}
                      </h4>
                    </div>

                    <p className="text-gray-600 mt-5 line-clamp-3">
                      {item.description}
                    </p>

                    <div className="mt-6 flex gap-3">
                      <div
                        
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-center font-semibold transition-all duration-300"
                      >
                        Edit
                      </div>

                      <button
                        onClick={() => deleteItem(item._id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-all duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
