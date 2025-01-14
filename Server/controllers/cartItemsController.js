import cartProductModel from "../models/cartProductModel.js";
import userModel from "../models/userModel.js";
// Create Cart-Items
const createCartController = async (req, res) => {
  try {
    // const userId = req.userId;
    // console.log(userId);

    const { productId, userId } = req.body;

    if (!productId) {
      return res.status(401).json({
        message: "Product Id is required",
        error: true,
        success: false,
      });
    }

    const checkCartItem = await cartProductModel.find({
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

// Update Cart-Items
const updateCartItemsQtyController = async (req, res) => {
  try {
    const { _id, quantity } = req.body;

    if (!_id) {
      return res.status(404).json({
        message: "provide Id",
        error: true,
        success: false,
      });
    }
    // Update the quantity
    const cartItems = await cartProductModel.updateOne(
      { _id }, // Match productId._id
      { quantity }
    );

    // Check if any document was modified
    if (cartItems == null) {
      return res.status(404).json({
        message: "No matching product found in the cart.",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "success",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// Delete Cart-Items
const deleteCartItemsController = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({
        message: "Id is required",
        error: true,
        success: false,
      });
    }

    const cartitems = await cartProductModel.findByIdAndDelete(_id);

    if (!cartitems) {
      return res.status(404).json({
        message: "Item not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Item removed successfully",
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

export {
  createCartController,
  getCartItemsController,
  updateCartItemsQtyController,
  deleteCartItemsController,
};
