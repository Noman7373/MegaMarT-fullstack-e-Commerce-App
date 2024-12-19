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
    // for users
    let { page, limit, search } = req.body;

    if (!page) {
      page = 1;
    }

    if (!limit) {
      limit = 10;
    }

    // query for search
    const query = search
      ? {
          $text: {
            $search: search,
          },
        }
      : {};

    const skip = (page - 1) * limit;
    const [data, totalCount] = await Promise.all([
      productModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      productModel.countDocuments(query),
    ]);

    return res.status(200).json({
      message: "Products retrieved successfully",
      error: false,
      success: true,
      totalCount,
      totalNoPage: Math.ceil(totalCount / limit),
      data,
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
