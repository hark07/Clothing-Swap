import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = req.body.name || user.name;

    user.phone = req.body.phone || user.phone;

    user.location = req.body.location || user.location;

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.profileImage = req.file.path;

    await user.save();

    res.status(200).json({
      success: true,
      image: user.profileImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
