import mongoose from "mongoose";

const userAddressSchema = new mongoose.Schema(
  {
    address_line: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    pincode: {
      type: String,
    },
    country: {
      type: String,
    },
    mobile: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const userAddressModel = mongoose.model("UserAddress", userAddressSchema);

export default userAddressModel;
