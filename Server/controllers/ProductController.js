import productModel from "../models/productModel.js";

const createProductController = async (req, res) => {
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

    // Create Product
    const createProduct = new productModel({
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

// Fetch All product
const getAllProductController = async (req, res) => {
  try {
    const productData = await productModel.find();

    if (!productData) {
      return res.status(404).json({
        message: "No Data Found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Products retrieved successfully",
      error: false,
      success: true,
      productData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export { createProductController, getAllProductController };
