import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import ItemCard from "../components/ItemCard";

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data } = await API.get("/items");
      setItems(data.items || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase()),
  );

  const homeItems = filteredItems.slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-green-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Clothing Exchange Marketplace
          </h1>

          <p className="text-lg md:text-xl text-emerald-50 max-w-2xl mx-auto">
            Buy, Swap & Reuse Fashion Sustainably
          </p>
        </div>
      </section>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-6 -mt-8">
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <input
            type="text"
            placeholder="Search clothing items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-lg outline-none"
          />
        </div>
      </div>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Latest Products</h2>

          <div className="flex items-center gap-4">
            <span className="text-gray-500">{filteredItems.length} Items</span>

            {filteredItems.length > 8 && (
              <Link
                to="/products"
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
              >
                View All
              </Link>
            )}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl h-[420px] animate-pulse"
              />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700">
              No Items Found
            </h3>
          </div>
        ) : (
          <>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {homeItems.map((item) => (
                <ItemCard key={item._id} item={item} />
              ))}
            </div>

            {filteredItems.length > 8 && (
              <div className="text-center mt-10">
                <Link
                  to="/products"
                  className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition"
                >
                  View All Products
                </Link>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
