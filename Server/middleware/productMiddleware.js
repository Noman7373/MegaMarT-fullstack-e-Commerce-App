const validateProduct = (req, res, next) => {
  try {
    const {
      name,
      image,
      description,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      more_details,
    } = req.body;

    if (
      !name ||
      !image[0] ||
      !description ||
      !category[0] ||
      !subCategory[0] ||
      !price ||
      !unit
    ) {
      return res.status(401).json({
        message: "All fields are required", // Fixed the typo here
        error: true,
        success: false,
      });
    }
    // If validation passes
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export default validateProduct;
