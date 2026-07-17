import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import API from "../api/axios";
import { toast } from "react-hot-toast";
import { FaTrash, FaSearch } from "react-icons/fa";

const Items = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchItems = async () => {
    try {
      const { data } = await API.get("/admin/items");
      setItems(data.items);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch items"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) return;

    try {
      const { data } = await API.delete(
        `/admin/items/${id}`
      );

      toast.success(data.message);

      setItems((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete item"
      );
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const filteredItems = items.filter(
    (item) =>
      item.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      item.brand
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div>
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">
            Items Management
          </h1>

          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />

            <input
              type="text"
              placeholder="Search items..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="pl-10 pr-4 py-2 border rounded-lg outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center text-lg">
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={
                    item.images?.[0] ||
                    "https://via.placeholder.com/400"
                  }
                  alt={item.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-4">
                  <h2 className="font-bold text-lg">
                    {item.title}
                  </h2>

                  <p className="text-gray-500">
                    {item.brand}
                  </p>

                  <div className="mt-3 space-y-1 text-sm">
                    <p>
                      <strong>Category:</strong>{" "}
                      {item.category}
                    </p>

                    <p>
                      <strong>Size:</strong>{" "}
                      {item.size}
                    </p>

                    <p>
                      <strong>Condition:</strong>{" "}
                      {item.condition}
                    </p>

                    <p>
                      <strong>Location:</strong>{" "}
                      {item.location}
                    </p>

                    <p>
                      <strong>Owner:</strong>{" "}
                      {item.owner?.name ||
                        "Unknown"}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      deleteItem(item._id)
                    }
                    className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                  >
                    <FaTrash />
                    Delete Item
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading &&
          filteredItems.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No Items Found
            </div>
          )}
      </div>
    </AdminLayout>
  );
};

export default Items;