import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: Array,
      default: [],
    },
    category: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "category",
        required: true,
      },
    ],
    subCategory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "SubCategory",
        required: true,
      },
    ],
    unit: {
      type: String,
      default: "",
    },
    stock: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: null,
      required: true,
    },
    discount: {
      type: Number,
      default: null,
    },
    description: {
      type: String,
      default: "",
      required: true,
    },
    more_details: {
      type: Object,
      default: {},
    },
    publish: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// create a text index
productSchema.index(
  {
    name: "text",
    description: "text",
  },
  {
    weights: {
      name: 10,        // Higher weight for 'name'
      description: 5,  // Lower weight for 'description'
    },
  }
);

const productModel = mongoose.model("product", productSchema);

export default productModel;
