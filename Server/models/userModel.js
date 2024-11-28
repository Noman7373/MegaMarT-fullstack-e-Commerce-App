import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, requried: [ture, "Provide Name"] },
    email: {
      type: String,
      trim: true,
      unique: true,
      requried: [ture, "Provide Email"],
    },
    password: {
      type: String,
      requried: [ture, "Provide Password"],
      trim: true,
    },
    avater: { type: String, default: "" },
    mobile: { type: Number, default: null },
    refresh_token: { type: String, default: "" },
    verify_email: { type: Boolean, default: false },
    last_Login_date: { type: Data, default: "" },
    status: {
      type: String,
      enum: ["Active", "InActive", "Suspended"],
      default: "Active",
    },
    address_details: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "userAddress",
      },
    ],
    shopping_cart: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "cartProduct",
      },
    ],
    orderHistory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "order",
      },
    ],
    forgot_password_otp: { type: String, default: null },
    forgot_password_expise: { type: Date, default: "" },
    role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
