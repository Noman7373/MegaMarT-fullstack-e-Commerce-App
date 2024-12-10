import categoryModel from "../models/categoryModel.js";

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

    // process to add 
    const updateCategoryModel = new categoryModel({
      name,
      image,
    });

    const addedCategory = await updateCategoryModel.save();

    // validation
    if (!addedCategory) {
      return res.status(500).json({
        message: "Category not added",
        error: success,
        success: false,
      });
    }

    return res.json({
      message: "Added",
      success: true,
      error: false,
      categoryProducts: addedCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export default AddCategoryController;
