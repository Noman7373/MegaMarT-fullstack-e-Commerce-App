import cartProductModel from "../models/cartProductModel.js";
import orderModels from "../models/orderModels.js";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";

const PaymentByCashController = async (req, res) => {
  try {
    const userId = req.userId; // Extracted from Auth Middleware
    const { itemsList, totalAmount, delivery_address_Id, subTotalAmount } =
      req.body;

    if (
      !itemsList ||
      !itemsList.length ||
      !totalAmount ||
      !delivery_address_Id
    ) {
      return res.status(400).json({
        message:
          "Invalid request payload. Ensure all required fields are provided.",
        error: true,
        success: false,
      });
    }

    const Payload = itemsList.map((item) => ({
      userId,
      orderId: `ORD-${new mongoose.Type.ObjectId()}`, // Generate or assign a unique ID
      productId: item.productId,
      product_details: {
        name: item.productId.name || "",
        image: item.productId.image || "",
      },
      paymentId: "",
      payment_status: "pending",
      delivery_address: delivery_address_Id,
      subTotalAmount: item.subTotal || subTotalAmount,
      totalAmount,
    }));

    const generateOrders = await orderModels.insertMany(Payload);
    const removeCartItems = cartProductModel.deleteMany({ userId });
    const updateUserId = userModel.updateOne(
      {
        _id: userId,
      },
      {
        shopping_cart: [],
      }
    );

    return res.status(201).json({
      message: "Cash payment orders created successfully.",
      data: savedOrders,
      error: false,
      success: true,
      generateOrders,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

export { PaymentByCashController };
