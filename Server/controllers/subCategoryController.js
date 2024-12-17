// import productModel from "../models/productModel.js";/
import subCategoryModel from "../models/subCategoryModel.js";

// Create Subcategory Controller
const subCategoryController = async (req, res) => {
  try {
    const { name, image, category } = req.body;

    if (!name || !image || !category[0] || category.length === 0) {
      return res.status(400).json({
        message: "All fields are required and category cannot be empty",
        error: true,
        success: false,
      });
    }

    const createdCategoryModel = new subCategoryModel({
      name,
      image,
      category
    });

    const savedSubCategory = await createdCategoryModel.save();

    // validation
    if (!savedSubCategory) {
      return res.status(500).json({
        message: "SubCategory not added",
        error: success,
        success: false,
      });
    }

    // Populate the category field for a detailed response

    return res.status(201).json({
      message: "Subcategory created successfully",
      error: false,
      success: true,
      savedSubCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// Fetch Subcategory Controller
const getSubcategories = async (req, res) => {
  try {
    const savedSubCategory = await subCategoryModel
      .find()
      .sort({ createdAt: -1 });

    if (!savedSubCategory) {
      return res.status(500).json({
        message: "No subcategory found",
        error: true,
        success: false,
      });
    }

    return res.status(201).json({
      message: "Get categories successfully",
      error: false,
      success: true,
      savedSubCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// Update Subcategory Controller
const updateSubCategoryController = async (req, res) => {
  try {
    const { _id } = req.params;
    const { name, image, category } = req.body;

    // if (!_id) {
    //   return res.status(404).json({
    //     message: "Id is requried",
    //     error: true,
    //     success: false,
    //   });
    // }

    if (!name || !image || !category) {
      return res.status(401).json({
        message: "All fields are requried",
        error: true,
        success: false,
      });
    }

    const savedSubCategory = await subCategoryModel.findByIdAndUpdate(_id, {
      name,
      image,
      category,
    });

    return res.status(200).json({
      message: "Successfully Updated",
      error: false,
      success: true,
      savedSubCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// Delete Subcategory Controller
const deleteSubcategoriesController = async (req, res) => {
  try {
    const { _id } = req.body;

    const savedSubCategory = await subCategoryModel.findByIdAndDelete(_id);

    return res.status(200).json({
      message: "Subcategory Deleted Successfully",
      error: false,
      success: true,
      savedSubCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export {
  subCategoryController,
  getSubcategories,
  updateSubCategoryController,
  deleteSubcategoriesController,
};
