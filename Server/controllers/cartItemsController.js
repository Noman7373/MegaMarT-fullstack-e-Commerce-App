
import cartProductModel from "../models/cartProductModel.js";
import userModel from "../models/userModel.js";

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

    const cartItems = new cartProductModel({
      quantity: 1,
      productId,
      userId,
    });

    //  Save cartDetails
    const cartProducts = await cartItems.save();

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
      cartProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export { createCartController };
