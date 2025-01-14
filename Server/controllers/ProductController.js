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
      productModel
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("category subCategory"),
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

// get Product Data by Category
const getProductByCategory = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(401).json({
        message: "id required",
        error: true,
        success: false,
      });
    }
    const categoryProduct = await productModel
      .find({
        category: { $in: id },
      })
      .limit(20);

    return res.json({
      message: "Category Product List",
      error: false,
      success: true,
      categoryProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// get Product Data by Subcategory

const getProductBySubcategory = async (req, res) => {
  try {
    const { categoryId, subCategoryId } = req.body;

    if (!categoryId || !subCategoryId) {
      return res.status(401).json({
        message: "Id not match",
        error: true,
        success: false,
      });
    }

    const productBySubcategory = await productModel.find({
      category: { $in: categoryId },
      subCategory: { $in: subCategoryId },
    });

    return res.json({
      message: "Get All Products Successfully",
      error: false,
      success: true,
      productBySubcategory,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// get Product Details by ID
const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const productDetails = await productModel.find({ _id: id });

    return res.status(200).json({
      message: "Fetch details successfully",
      error: false,
      success: true,
      productData: productDetails,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// Update Product by ID
const updateProductController = async (req, res) => {
  try {
    const {
      _id,
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

    if (!_id) {
      return res.status(401).json({
        message: "Product ID is required",
        error: true,
        success: false,
      });
    }

    const data = await productModel.updateOne(
      { _id },
      {
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
      }
    );

    return res.json({
      message: "Product Updated Successfully",
      error: false,
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// Delete Product Details by ID
const deleteProductController = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(401).json({
        message: "Id is required",
        error: true,
        success: false,
      });
    }

    const data = await productModel.findByIdAndDelete({ _id });

    return res.json({
      message: "Product Deleted Successfully",
      error: false,
      success: true,
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

// Search Product Controllers
const searchProductController = async (req, res) => {
  try {
    const { search } = req.body;

    
    const firstMatchQuery = search
      ? {
          $or: [
            { name: { $regex: `^${search}`, $options: "i" } }, // Matches products starting with search term
            { description: { $regex: `^${search}`, $options: "i" } },
          ],
        }
      : {};

    const exactMatchQuery = search
      ? {
          $text: { $search: search }, // Exact match using text search
        }
      : {};

    // First query to fetch initial matches (products starting with the search term)
    const firstMatchProducts = await productModel
      .find(firstMatchQuery)
      .sort({ createdAt: -1 });

    // If the search term is refined (e.g., user types more), run the exact match query
    const refinedMatchProducts = search
      ? await productModel.find(exactMatchQuery).sort({ createdAt: -1 })
      : [];

    // Combine the two results
    const productsToShow = search
      ? [...firstMatchProducts, ...refinedMatchProducts]
      : [];


    return res.json({
      message: search
        ? "Products found successfully"
        : "All products retrieved",
      error: false,
      success: true,
      productsToShow
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: true,
    });
  }
};

export {
  createProductController,
  getAllProductController,
  getProductByCategory,
  getProductBySubcategory,
  getProductDetails,
  updateProductController,
  deleteProductController,
  searchProductController,
};
