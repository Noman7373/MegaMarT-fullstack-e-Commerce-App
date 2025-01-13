import cartProductModel from "../models/cartProductModel.js";
import orderModels from "../models/orderModels.js";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";
import discountPrice from "../utils/discoutPrice.js";
import Stripe from "../DB/stripe.js";

const PaymentByCashController = async (req, res) => {
  try {
    const userId = req.userId; // Extracted from Auth Middleware
    const { itemsList, totalAmount, delivery_address_Id, subTotalAmount } =
      req.body;

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

//  Stripe_payment_controller
const StripePaymentController = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemsList, totalAmount, delivery_address_Id, subTotalAmount } =
      req.body;

    // Find user by userId
    const user = await userModel.findById(userId);

    // Map the items list to line items for Stripe
    const line_items = itemsList.map((items) => {
      return {
        price_data: {
          currency: "pkr", // Ensure currency is set as expected
          product_data: {
            name: items.productId.name, // Product name
            images: items.productId.image, // Product image (ensure it's an array)
            metadata: {
              productId: items.productId._id.toString(), // Add metadata if needed
            },
          },
          unit_amount:
            discountPrice(items.productId.price, items.productId.discount) *
            100,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: items.quantity,
      };
    });

    // console.log(line_items); // Log the final line_items array to ensure the structure is correct

    // Parameters for creating the Stripe session
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: user.email,
      metadata: {
        userId,
        delivery_address_Id,
      },
      line_items,
      success_url: `${process.env.FRONTEND_URL}/order/success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
    };

    // Create the Stripe checkout session
    const session = await Stripe.checkout.sessions.create(params);

    return res.status(303).json(session);
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export {
  PaymentByCashController,
  getOrderHistoryController,
  StripePaymentController,
};
