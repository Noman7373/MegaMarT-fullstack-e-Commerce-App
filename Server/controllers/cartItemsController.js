import cartProductModel from "../models/cartProductModel.js";
import userModel from "../models/userModel.js";
// Create Cart-Items
const createCartController = async (req, res) => {
  try {
    const userId = req.userId;

    const { productId } = req.body;

    if (!productId) {
      return res.status(401).json({
        message: "Product Id is required",
        error: true,
        success: false,
      });
    }

    const checkCartItem = await cartProductModel.find({
      userId,
      productId,
    });

    if (checkCartItem.length > 0) {
      return res.status(400).json({
        message: "Item already exists in the cart!",
        error: true,
        success: false,
      });
    }

    const cartItems = new cartProductModel({
      quantity: 1,
      productId,
      userId,
    });

    //  Save cartDetails
    const newCartItem = await cartItems.save();

    //  Update shoppingfield inside UsersModel
    const updateCartUser = await userModel.updateOne(
      { _id: userId },
      {
        $push: { shopping_cart: productId },
      }
    );

    return res.status(201).json({
      message: "Cart item created successfully",
      error: false,
      success: true,
      newCartItem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// Get Cart-Items
const getCartItemsController = async (req, res) => {
  try {
    // const userId = req.userId;
    const cartItems = await cartProductModel.find().populate("productId"); // to get details that particular product

    return res.json({
      message: "Fetch Cart-Items successfully",
      error: false,
      success: true,
      cartItems,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export { createCartController, getCartItemsController };
