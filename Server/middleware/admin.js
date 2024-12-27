import userModel from "../models/userModel.js";

export const checkAdmin = async (req, res, next) => {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId);

    if (user.role !== "ADMIN") {
      return res.status(400).json({
        message: "Permission Denail",
        error: true,
        success: false,
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
