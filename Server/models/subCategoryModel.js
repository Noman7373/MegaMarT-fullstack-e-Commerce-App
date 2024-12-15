import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    category: [
      {
        _id: {
          type: mongoose.Schema.ObjectId,
          ref: "category", // Ensure 'Category' model name is correct
        },
        name: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const subCategoryModel = mongoose.model("SubCategory", subCategorySchema);

export default subCategoryModel;
