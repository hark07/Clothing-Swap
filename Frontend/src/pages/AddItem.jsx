import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { UploadCloud, X, MapPin, Package } from "lucide-react";

import toast from "react-hot-toast";

import API from "../api/axios";

const AddItem = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    brand: "",
    size: "",
    condition: "",
    description: "",
    estimatedValue: "",
    location: "",
  });

  const [images, setImages] = useState([]);

  const [previewImages, setPreviewImages] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,

      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      toast.error("Maximum 5 photos allowed");

      return;
    }

    setImages(files);

    const previews = files.map((file) => ({
      file,

      url: URL.createObjectURL(file),
    }));

    setPreviewImages(previews);
  };

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);

    const updatedPreview = previewImages.filter((_, i) => i !== index);

    setImages(updatedImages);

    setPreviewImages(updatedPreview);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const toastId = toast.loading("Uploading item...");

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      images.forEach((image) => {
        data.append("images", image);
      });

      await API.post(
        "/items",

        data,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.success(
        "Item added successfully 🎉",

        {
          id: toastId,
        },
      );

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add item");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-slate-100
      via-white
      to-slate-100
      py-12
    "
    >
      <div
        className="
        max-w-5xl
        mx-auto
        px-4
      "
      >
        <div
          className="
          bg-white
          rounded-3xl
          shadow-2xl
          border
          border-gray-200
          overflow-hidden
        "
        >
          {/* Header */}

          <div
            className="
            bg-black
            text-white
            px-8
            py-8
          "
          >
            <h1
              className="
              text-4xl
              font-black
            "
            >
              Add New Clothing Item
            </h1>

            <p
              className="
              text-gray-300
              mt-2
            "
            >
              Upload up to 5 high-quality photos and provide item details.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="
              p-8
              space-y-8
            "
          >
            {/* Basic Information */}

            <div
              className="
              grid
              md:grid-cols-2
              gap-6
            "
            >
              {/* Title */}

              <div>
                <label
                  className="
                  block
                  text-sm
                  font-semibold
                  mb-2
                "
                >
                  Item Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Zara Denim Jacket"
                  required
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-gray-300
                    px-5
                    py-4
                    focus:ring-2
                    focus:ring-black
                    outline-none
                  "
                />
              </div>

              {/* Brand */}

              <div>
                <label
                  className="
                  block
                  text-sm
                  font-semibold
                  mb-2
                "
                >
                  Brand
                </label>

                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Nike, Zara, H&M"
                  required
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-gray-300
                    px-5
                    py-4
                    focus:ring-2
                    focus:ring-black
                    outline-none
                  "
                />
              </div>

              {/* Category */}

              <div>
                <label
                  className="
                  block
                  text-sm
                  font-semibold
                  mb-2
                "
                >
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-gray-300
                    px-5
                    py-4
                    focus:ring-2
                    focus:ring-black
                    outline-none
                  "
                >
                  <option value="">Select Category</option>

                  <option>T-Shirt</option>
                  <option>Shirt</option>
                  <option>Hoodie</option>
                  <option>Jacket</option>
                  <option>Jeans</option>
                  <option>Trouser</option>
                  <option>Shorts</option>
                  <option>Shoes</option>
                  <option>Sneakers</option>
                  <option>Kurta</option>
                  <option>Sweater</option>
                  <option>Blazer</option>
                </select>
              </div>

              {/* Size */}

              <div>
                <label
                  className="
                  block
                  text-sm
                  font-semibold
                  mb-2
                "
                >
                  Size
                </label>

                <select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-gray-300
                    px-5
                    py-4
                    focus:ring-2
                    focus:ring-black
                    outline-none
                  "
                >
                  <option value="">Select Size</option>

                  <option>XS</option>
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                  <option>XXL</option>
                  <option>Free Size</option>
                </select>
              </div>

              {/* Condition */}

              <div>
                <label
                  className="
                  block
                  text-sm
                  font-semibold
                  mb-2
                "
                >
                  Condition
                </label>

                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-gray-300
                    px-5
                    py-4
                    focus:ring-2
                    focus:ring-black
                    outline-none
                  "
                >
                  <option value="">Select Condition</option>

                  <option>Brand New</option>
                  <option>Like New</option>
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Fair</option>
                </select>
              </div>

              {/* Estimated Value */}

              <div>
                <label
                  className="
                  block
                  text-sm
                  font-semibold
                  mb-2
                "
                >
                  Estimated Value
                </label>

                <div className="relative">
                  <input
                    type="number"
                    name="estimatedValue"
                    value={formData.estimatedValue}
                    onChange={handleChange}
                    placeholder="Price"
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-gray-300
                      pl-12
                      pr-5
                      py-4
                      focus:ring-2
                      focus:ring-black
                      outline-none
                    "
                  />
                </div>
              </div>
            </div>

            {/* Location */}

            <div>
              <label
                className="
                block
                text-sm
                font-semibold
                mb-2
              "
              >
                Location
              </label>

              <div className="relative">
                <MapPin
                  size={18}
                  className="
                    absolute
                    left-4
                    top-4
                    text-gray-500
                  "
                />

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Kathmandu"
                  required
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-gray-300
                    pl-12
                    pr-5
                    py-4
                    focus:ring-2
                    focus:ring-black
                    outline-none
                  "
                />
              </div>
            </div>

            {/* Description */}

            <div>
              <label
                className="
                block
                text-sm
                font-semibold
                mb-2
              "
              >
                Description
              </label>

              <textarea
                rows={5}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="
                Describe your item, material, color, usage, defects...
                "
                className="
                  w-full
                  rounded-2xl
                  border
                  border-gray-300
                  px-5
                  py-4
                  resize-none
                  focus:ring-2
                  focus:ring-black
                  outline-none
                "
              />
            </div>

            {/* Upload Photos */}

            <div>
              <label
                className="
                block
                text-sm
                font-semibold
                mb-3
              "
              >
                Upload Photos
              </label>

              <label
                className="
                border-2
                border-dashed
                border-gray-300
                rounded-3xl
                p-10
                flex
                flex-col
                items-center
                justify-center
                cursor-pointer
                hover:border-black
                transition
              "
              >
                <UploadCloud size={50} className="text-gray-400" />

                <h3
                  className="
                  mt-4
                  text-xl
                  font-bold
                "
                >
                  Upload up to 5 Photos
                </h3>

                <p
                  className="
                  text-gray-500
                  mt-2
                "
                >
                  JPG, PNG or WEBP
                </p>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              <p
                className="
                mt-3
                text-sm
                text-gray-500
              "
              >
                {images.length} / 5 photos selected
              </p>
            </div>

            {/* Preview */}

            {previewImages.length > 0 && (
              <div>
                <div
                  className="
                  flex
                  items-center
                  justify-between
                  mb-4
                "
                >
                  <h3
                    className="
                    text-lg
                    font-bold
                  "
                  >
                    Selected Photos
                  </h3>

                  <span
                    className="
                    text-sm
                    text-gray-500
                  "
                  >
                    {previewImages.length} / 5
                  </span>
                </div>

                <div
                  className="
                  grid
                  grid-cols-2
                  md:grid-cols-3
                  lg:grid-cols-5
                  gap-4
                "
                >
                  {previewImages.map((image, index) => (
                    <div
                      key={index}
                      className="
                        relative
                        overflow-hidden
                        rounded-2xl
                        border
                        shadow-sm
                      "
                    >
                      <img
                        src={image.url}
                        alt={`preview-${index}`}
                        className="
                          w-full
                          h-40
                          object-cover
                        "
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="
                          absolute
                          top-2
                          right-2
                          bg-red-500
                          hover:bg-red-600
                          text-white
                          rounded-full
                          p-2
                        "
                      >
                        <X size={16} />
                      </button>

                      {index === 0 && (
                        <span
                          className="
                          absolute
                          bottom-2
                          left-2
                          bg-black
                          text-white
                          text-xs
                          px-2
                          py-1
                          rounded-full
                        "
                        >
                          Cover
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit */}

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  rounded-2xl
                  bg-black
                  hover:bg-gray-900
                  text-white
                  py-4
                  text-lg
                  font-semibold
                  shadow-xl
                  transition
                  disabled:opacity-60
                  flex
                  items-center
                  justify-center
                  gap-3
                "
              >
                {loading ? (
                  "Uploading Item..."
                ) : (
                  <>
                    <Package size={20} />
                    Publish Item
                  </>
                )}
              </button>

              <p
                className="
                text-center
                text-sm
                text-gray-500
                mt-4
              "
              >
                Your item will be visible after successful upload.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
