import Item from "../models/Item.js";

/**
 * Create Item
 */
export const createItem = async (req, res) => {
  try {
    const {
      title,
      category,
      brand,
      size,
      condition,
      description,
      estimatedValue,
      location,
    } = req.body;

    // Cloudinary image URLs
    const imageUrls = req.files?.map((file) => file.path) || [];

    const item = await Item.create({
      owner: req.user._id,
      title,
      category,
      brand,
      size,
      condition,
      description,
      estimatedValue,
      location,
      images: imageUrls,
    });

    res.status(201).json({
      success: true,
      item,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get All Items
 */
export const getItems = async (req, res) => {
  try {
    const { category, brand, size, condition, location } = req.query;

    const filter = {};

    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (size) filter.size = size;
    if (condition) filter.condition = condition;
    if (location) filter.location = location;

    const items = await Item.find({
      ...filter,
      status: "available",
    })
      .populate("owner", "name profileImage location")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Single Item
 */
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate(
      "owner",
      "name email profileImage location",
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update Item
 */
export const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    if (item.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this item",
      });
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      item: updatedItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Delete Item
 */
export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    if (item.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this item",
      });
    }

    await item.deleteOne();

    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Logged User Items
 */
export const getMyItems = async (req, res) => {
  try {
    const items = await Item.find({
      owner: req.user._id,
      status: "available",
    })
      .populate("owner", "name profileImage location")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
