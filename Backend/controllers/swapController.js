import Swap from "../models/Swap.js";
import Item from "../models/Item.js";
import Notification from "../models/Notification.js";

/**
 * Create Swap Request
 */
export const createSwapRequest = async (req, res) => {
  try {
    const { requesterItemId, receiverItemId } = req.body;

    const requesterItem = await Item.findById(requesterItemId);
    const receiverItem = await Item.findById(receiverItemId);

    if (!requesterItem) {
      return res.status(404).json({
        success: false,
        message: "Your selected item not found",
      });
    }

    if (!receiverItem) {
      return res.status(404).json({
        success: false,
        message: "Requested item not found",
      });
    }

    if (requesterItem.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only offer your own item",
      });
    }

    if (requesterItem.owner.toString() === receiverItem.owner.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot swap with yourself",
      });
    }

    if (
      requesterItem.status !== "available" ||
      receiverItem.status !== "available"
    ) {
      return res.status(400).json({
        success: false,
        message: "Items are not available",
      });
    }

    const swap = await Swap.create({
      requester: req.user._id,
      receiver: receiverItem.owner,
      requesterItem: requesterItem._id,
      receiverItem: receiverItem._id,
      status: "pending",
    });

    await Notification.create({
      user: receiverItem.owner,
      title: "New Swap Request",
      message: "You received a new swap request.",
    });

    res.status(201).json({
      success: true,
      message: "Swap request sent",
      swap,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get User Swaps
 */
export const getSwaps = async (req, res) => {
  try {
    const swaps = await Swap.find({
      $or: [{ requester: req.user._id }, { receiver: req.user._id }],
    })
      .populate("requester", "name email profileImage")
      .populate("receiver", "name email profileImage")
      .populate("requesterItem")
      .populate("receiverItem")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: swaps.length,
      swaps,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Accept Swap
 */
export const acceptSwap = async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id);

    if (!swap) {
      return res.status(404).json({
        success: false,
        message: "Swap not found",
      });
    }

    if (swap.receiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only receiver can accept swap",
      });
    }

    if (swap.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Swap already processed",
      });
    }

    swap.status = "accepted";

    await swap.save();

    await Notification.create({
      user: swap.requester,
      title: "Swap Accepted",
      message: "Your swap request has been accepted.",
    });

    res.status(200).json({
      success: true,
      message: "Swap accepted",
      swap,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Reject Swap
 */
export const rejectSwap = async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id);

    if (!swap) {
      return res.status(404).json({
        success: false,
        message: "Swap not found",
      });
    }

    if (swap.receiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only receiver can reject swap",
      });
    }

    if (swap.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Swap already processed",
      });
    }

    swap.status = "rejected";

    await swap.save();

    await Notification.create({
      user: swap.requester,
      title: "Swap Rejected",
      message: "Your swap request has been rejected.",
    });

    res.status(200).json({
      success: true,
      message: "Swap rejected",
      swap,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Cancel Swap
 */
export const cancelSwap = async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id);

    if (!swap) {
      return res.status(404).json({
        success: false,
        message: "Swap not found",
      });
    }

    if (swap.requester.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only requester can cancel swap",
      });
    }

    if (swap.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending swaps can be cancelled",
      });
    }

    swap.status = "cancelled";

    await swap.save();

    res.status(200).json({
      success: true,
      message: "Swap cancelled",
      swap,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Complete Swap
 */
export const completeSwap = async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id);

    if (!swap) {
      return res.status(404).json({
        success: false,
        message: "Swap not found",
      });
    }

    if (swap.status !== "accepted") {
      return res.status(400).json({
        success: false,
        message: "Swap must be accepted first",
      });
    }

    swap.status = "completed";

    await swap.save();

    await Item.findByIdAndUpdate(swap.requesterItem, {
      status: "swapped",
    });

    await Item.findByIdAndUpdate(swap.receiverItem, {
      status: "swapped",
    });

    await Notification.create({
      user: swap.requester,
      title: "Swap Completed",
      message: "Your swap has been completed.",
    });

    await Notification.create({
      user: swap.receiver,
      title: "Swap Completed",
      message: "Your swap has been completed.",
    });

    res.status(200).json({
      success: true,
      message: "Swap completed",
      swap,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
