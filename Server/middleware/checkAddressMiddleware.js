export const checkUserAddressMiddleware = async (req, res, next) => {
  try {
    const { address_line, city, state, pincode, country, mobile } = req.body;

    // Check if all required fields are present
    if (!address_line || !city || !state || !pincode || !country || !mobile) {
      return res.status(400).json({
        message:
          "All fields are required!",
        error: true,
        success: false,
      });
    }

    // Proceed to the next middleware or controller
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};
