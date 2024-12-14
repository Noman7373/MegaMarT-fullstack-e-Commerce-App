import subCategoryModel from "../models/subCategoryModel.js";

const subCategoryController = async (req, res) => {
  try {
    const { name, image, category } = req.body;

    if (!name || !image || !category[0]) {
      return res.status(400).json({
        message: "All fields are requried",
        error: true,
        success: false,
      });
    }

    const createdCategoryModel = new subCategoryModel({
      name,
      image,
      category,
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

export { subCategoryController, getSubcategories };
