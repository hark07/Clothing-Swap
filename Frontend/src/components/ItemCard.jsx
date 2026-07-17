import { Link } from "react-router-dom";
import { MapPin, Eye, Heart } from "lucide-react";

const ItemCard = ({ item }) => {
  const imageUrl = item.images?.[0]
    ? item.images[0].startsWith("http")
      ? item.images[0]
      : `https://clothing-swap.onrender.com${item.images[0]}`
    : "";

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={item.title}
            className="h-72 w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="h-72 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}

        {/* Brand */}
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow">
          {item.brand}
        </span>

        {/* Wishlist */}
        <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-red-500 hover:text-white transition">
          <Heart size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-900 line-clamp-1">
          {item.title}
        </h2>

        <p className="text-sm text-gray-500 mt-2 line-clamp-2 min-h-[40px]">
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
            {item.size}
          </span>

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
            {item.condition}
          </span>

          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
            {item.category}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-500 mt-5">
          <MapPin size={16} />
          <span>{item.location}</span>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-6">
          <div>
            <p className="text-xs text-gray-500">Estimated Value</p>

            <h3 className="text-2xl font-extrabold text-black">
              Rs. {item.estimatedValue}
            </h3>
          </div>

          <Link
            to={`/item/${item._id}`}
            className="flex items-center gap-2 bg-black hover:bg-gray-900 text-white px-5 py-3 rounded-xl font-semibold transition"
          >
            <Eye size={18} />
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
