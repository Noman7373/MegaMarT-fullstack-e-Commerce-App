import cartProductModel from "../models/cartProductModel.js";

import orderModels from "../models/orderModels.js";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";

const PaymentByCashController = async (req, res) => {
  try {
    const userId = req.userId; // Extracted from Auth Middleware
    const { itemsList, totalAmount, delivery_address_Id, subTotalAmount } =
      req.body;

    // if (
    //   !itemsList ||
    //   !itemsList.length ||
    //   !totalAmount ||
    //   !delivery_address_Id
    // ) {
    //   return res.status(400).json({
    //     message:
    //       "Invalid request payload. Ensure all required fields are provided.",
    //     error: true,
    //     success: false,
    //   });
    // }

    // Prepare Payload
    const Payload = itemsList.map((item) => ({
      userId,
      orderId: `ORD-${new mongoose.Types.ObjectId()}`,
      productId: item.productId,
      product_details: {
        name: item.productId?.name || "Unknown Product",
        image: item.productId?.image || "No Image Available",
      },
      paymentId: "",
      payment_status: "pending",
      delivery_address: delivery_address_Id,
      subTotalAmount: item.subTotal || subTotalAmount,
      totalAmount,
    }));

    // Save orders and update database
    const generateOrders = await orderModels.insertMany(Payload);

    // Remove cart items and update user concurrently
    await Promise.all([
      cartProductModel.deleteMany({ userId }),
      userModel.updateOne({ _id: userId }, { $set: { shopping_cart: [] } }),
    ]);

    return res.status(201).json({
      message: "Cash payment orders created successfully.",
      data: generateOrders,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

const getOrderHistoryController = async (req, res) => {
  try {
    const fetchOrderHistory = await orderModels.find();
    return res.status(200).json({
      message: "Retrive Order History Successfully!",
      fetchOrderHistory,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

export { PaymentByCashController, getOrderHistoryController };
