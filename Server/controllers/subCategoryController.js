import subCategoryModel from "../models/subCategoryModel.js";

const subCategoryController = async (req, res) => {
  try {
    const { name, image, category } = req.body;

    if (!name || !image || !category || category.length === 0) {
      return res.status(400).json({
        message: "All fields are required and category cannot be empty",
        error: true,
        success: false,
      });
    }

    // Map category to extract only _id if name and _id are sent
    const categoryIds = category.map((cat) => cat._id); // Ensure we are only sending _id values

    const createdCategoryModel = new subCategoryModel({
      name,
      image,
      category: categoryIds,
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

const updateSubCategoryController = async (req, res) => {
  try {
    const { _id } = req.params;
    const { name, image, category } = req.body;

    if (!_id) {
      return res.status(404).json({
        message: "Id is requried",
        error: true,
        success: false,
      });
    }

    if (!name || !image || !category) {
      return res.status(401).json({
        message: "All fields are requried",
        error: true,
        success: false,
      });
    }

    const savedUpdateSubCategory = await subCategoryModel.findByIdAndUpdate(
      _id,
      {
        name,
        image,
        category,
      }
    );

    if (!savedUpdateSubCategory) {
      return res.status(404).json({
        message: "Sub-category not found.",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "",
      error: false,
      success: true,
      savedUpdateSubCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export { subCategoryController, getSubcategories, updateSubCategoryController };
