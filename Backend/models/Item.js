import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      required: true,
    },

    size: {
      type: String,
      required: true,
    },

    condition: {
      type: String,
      enum: ["New", "Like New", "Excellent", "Good", "Fair"],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    estimatedValue: {
      type: Number,
      default: 0,
    },

    images: [
      {
        type: String,
      },
    ],

    location: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["available", "reserved", "swapped"],
      default: "available",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Item", itemSchema);
