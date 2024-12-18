import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";
import subCategoryModel from "../models/subCategoryModel.js";

const AddCategoryController = async (req, res) => {
  try {
    const { name, image } = req.body;

    // validation
    if (!name || !image) {
      return res.status(400).json({
        message: "All fields are requried",
        error: true,
        success: false,
      });
    }

    const updateCategoryModel = new categoryModel({
      name,
      image,
    });

    const addedCategory = await updateCategoryModel.save();

    return res.json({
      message: "Category added successfully",
      success: true,
      error: false,
      categoryProduct: addedCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const getCategoryProduct = async (req, res) => {
  try {
    const allCategory = await categoryModel.find().sort({ createdAt: -1 });

    return res.json({
      message: "Successfully",
      error: false,
      success: true,
      categoryProduct: allCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;

    const updatedCategory = await categoryModel.findByIdAndUpdate(id, {
      name,
      image,
    });

    return res.status(200).json({
      message: "Category updated successfullly",
      error: false,
      success: true,
      categoryProduct: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const { _id } = req.body;

    // Check if there are any subcategories related to the category
    const checkSubCategoryId = await subCategoryModel
      .find({
        category: { $in: [_id] },
      })
      .countDocuments();

    // Check if there are any products related to the category
    const checkProductId = await productModel
      .find({
        category: { $in: [_id] },
      })
      .countDocuments();

    // If there are related subcategories or products, prevent deletion
    if (checkSubCategoryId > 0 || checkProductId > 0) {
      return res.status(400).json({
        message: "Category is in use and cannot be deleted.",
        error: true,
        success: false,
      });
    }

    const deleteCategory = await categoryModel.findByIdAndDelete(_id);

    if (!deleteCategory) {
      return res.status(404).json({
        message: "Category not found.",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Category deleted successfullly",
      error: false,
      success: true,
      categoryProduct: deleteCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export {
  AddCategoryController,
  getCategoryProduct,
  updateCategory,
  deleteCategoryController,
};
