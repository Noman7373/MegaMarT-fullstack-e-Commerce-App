import React, { useEffect, useState } from "react";
import useHook from "../hooks/useHook";
import { useSelector } from "react-redux";
import CustomNotification from "../utils/CustomNotification.jsx";
import { createCartAxios } from "../Api/Query/userQuery.js";

const AddToCartButtons = ({ productData }) => {
  const { updateCartItemQuantity, fetchCartItems, removeCartItems } = useHook();
  const cartItems = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const userId = user._id;
  const [isLoading, setIsLoading] = useState(false);

  // for notification
  const [isVisible, setIsVisible] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

  const [cartDetails, setCartDetails] = useState();
  const [itemsAvailable, setitemsAvailable] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const _id = cartDetails?._id;

  // checkProduct
  const getCartDetails = (cartItems, productId) => {
    if (!cartItems?.cart)
      return { isAvailable: false, details: null, quantity: 0 };

    const checkProduct = cartItems.cart.some(
      (cart) => cart.productId?._id === productId
    );
    const cartDetails = cartItems.cart.find(
      (cart) => cart.productId?._id === productId
    );

    return {
      isAvailable: checkProduct,
      details: cartDetails,
      quantity: cartDetails?.quantity || 0,
    };
  };

  useEffect(() => {
    const { isAvailable, details, quantity } = getCartDetails(
      cartItems,
      productData?._id
    );
    setitemsAvailable(isAvailable);
    setCartDetails(details);
    setQuantity(quantity);
  }, [productData, cartItems]);

  // handle AddToCart item API
  const handleAddToCartItem = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);

    try {
      const response = await createCartAxios({
        userId,
        productId,
        quantity: 1,
      });
      if (response.data.success) {
        if (fetchCartItems) {
          fetchCartItems();
        }
        setIsVisible(true);
        setNotification({
          message: "Product added to cart successfully!",
          type: "success",
        });
      }
    } catch (error) {
      setIsVisible(true);
      setNotification({
        message: error.message,
        type: "error",
      });
    }
  };

  // Quantity Increament
  const handleIncreament = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity < productData.stock) {
      updateCartItemQuantity(_id, quantity + 1);
      setIsVisible(true);
      setNotification({
        message: `Items Added Successfully`,
        type: "success",
      });
    }
  };

  // Quantity Decreament
  const handleDecreament = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!cartDetails || !_id) {
      console.error("Cart item ID is not available.");
      return;
    }
    if (quantity === 1) {
      removeCartItems(cartDetails?._id);
    } else {
      updateCartItemQuantity(_id, quantity - 1);
    }
    setIsVisible(true);
    setNotification({
      message: `Item removed Successfully`,
      type: "error",
    });
  };

  return (
    <>
      {!itemsAvailable && (
        <button
          className="mt-2 px-4 py-1 bg-[#F7FFF9] text-[#318616] border border-[#318616] rounded"
          onClick={(e) => handleAddToCartItem(e, productData?._id)}
        >
          Add
        </button>
      )}

      {itemsAvailable && (
        <div className="flex gap-2 bg-[#318616] text-white rounded-md py-1">
          <button
            className="rounded text-white px-2 font-semibold hover:bg-[#1d8242] hover:text-white"
            onClick={(e) => handleIncreament(e)}
          >
            +
          </button>
          {quantity}
          <button
            className="text-white px-2 font-semibold hover:bg-[#1d8242] hover:text-white"
            onClick={(e) => handleDecreament(e)}
          >
            -
          </button>
        </div>
      )}

      {/* Notification */}
      <CustomNotification
        Notification={{
          message: notification.message,
          type: notification.type,
          isVisible,
          setIsVisible,
        }}
      />
    </>
  );
};

export default AddToCartButtons;
