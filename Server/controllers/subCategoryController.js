import subCategoryModel from "../models/subCategoryModel.js";

const subCategoryController = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json({
        message: "All fields are requried",
        error: true,
        success: false,
      });
    }

    const createdCategoryModel = new subCategoryModel({
      name,
      image,
    });

    const saveSubCategory = await createdCategoryModel.save();

    // validation
    if (!saveSubCategory) {
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
      saveSubCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export { subCategoryController };
