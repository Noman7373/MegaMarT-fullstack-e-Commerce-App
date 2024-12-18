import productModel from "../models/productModel";

const createProductController = async (req, res) => {
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

    //  validation
    if (
      !name ||
      !image[0] ||
      !description ||
      !category[0] ||
      !subCategory[0] ||
      !price ||
      !units
    ) {
      return res.status(401).json({
        message: "All fields are requried",
        error: true,
        success: false,
      });
    }

    // Create Product
    const createProduct = new productModel({
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
    });

    // save Product Data
    const productData = await createProduct.save();

    return res.status(201).json({
      message: "Product created successfully",
      success: true,
      error: false,
      productData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export { createProductController };
