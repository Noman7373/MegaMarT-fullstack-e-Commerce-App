const validateProduct = (req, res, next) => {
  try {
    const {
      name,
      image,
      description,
      category,
      subCategory,
      units,
      stock,
      price,
      discount,
      more_details,
    } = req.body;

    if (
      !name ||
      !image ||
      !description ||
      !price ||
      !units ||
      !Array.isArray(image) ||
      image.length === 0 ||
      !Array.isArray(category) ||
      category.length === 0 ||
      !Array.isArray(subCategory) ||
      subCategory.length === 0
    ) {
      return res.status(401).json({
        message: "All fields are requried",
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
