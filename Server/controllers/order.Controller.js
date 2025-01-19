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

    // Validate required fields
    if (!userId || !itemsList || !totalAmount) {
      return res.status(400).json({
        message: "Missing required fields.",
        error: true,
        success: false,
      });
    }

    // Find user by ID
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        error: true,
        success: false,
      });
    }

    // Map items list to Stripe line_items
    const line_items = itemsList.map((items) => {
      if (!items.productId || !items.productId.name || !items.productId.image) {
        throw new Error("Invalid product data in items list.");
      }

      return {
        price_data: {
          currency: "pkr",
          product_data: {
            name: items.productId.name,
            images: items.productId.image,
            metadata: {
              productId: items.productId._id.toString(),
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

    // Create Stripe session
    const session = await Stripe.checkout.sessions.create({
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: user.email,
      metadata: {
        userId,
        delivery_address_Id,
      },
      line_items: line_items,
      success_url: `${process.env.FRONTEND_URL}/payment/success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
    });

    return res.json(session);
  } catch (error) {
    console.error("Stripe Payment Error:", error.message, error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

// Webhook to handle Stripe events
const handleStripeWebhook = async (req, res) => {
  try {
    // Extracting the event from the request body
    const stripeEvent = req.body;
    const secretEndPoint = process.env.STRIPE_WEBHOOK_SECRET_KEY;
    
    // Log the event for debugging purposes (optional)
    console.log("Received Stripe Event:", stripeEvent);

    if (stripeEvent.type === "payment_intent.succeeded") {
      const session = stripeEvent.data.object;
      const line_items = await Stripe.checkout.sessions.line_items(session.id);

      console.log(line_items, "lineItems" || "nod data");

      console.log("Payment succeeded:", stripeEvent.data.object);
    } else if (stripeEvent.type === "payment_intent.failed") {
      console.log("Payment failed:", stripeEvent.data.object);
    } else {
      console.log("Unhandled event type:", stripeEvent.type);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).send("Internal Server Error");
  }
};

export {
  PaymentByCashController,
  getOrderHistoryController,
  StripePaymentController,
  handleStripeWebhook,
};
