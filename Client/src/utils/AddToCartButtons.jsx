import React, { useEffect, useState } from "react";
import useHook from "../hooks/useHook";
import { useSelector } from "react-redux";
import CustomNotification from "../utils/CustomNotification.jsx";
import { createCartAxios } from "../Api/Query/userQuery.js";

const AddToCartButtons = ({ productData }) => {
  const { updateCartItemQuantity, fetchCartItems } = useHook();
  const cartItems = useSelector((state) => state.cart);

  // for notification
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

  const [cartDetails, setCartDetails] = useState();
  const _id = cartDetails?._id;
  const [itemsAvailable, setitemsAvailable] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // checkProduct
  useEffect(() => {
    const getCartArray = cartItems.cart.map((cart) => cart.productId);
    const checkProduct = getCartArray.some(
      (cart) => cart._id === productData._id
    );
    setitemsAvailable(checkProduct);

    const getCartQty = cartItems.cart.find(
      (cart) => cart.productId._id === productData._id
    );
    setCartDetails(getCartQty);

    if (getCartQty) {
      setQuantity(getCartQty.quantity);
    }
  }, [productData, cartItems]);

  // handle AddToCart item API
  const handleAddToCartItem = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);

    try {
      const response = await createCartAxios({ productId, quantity: 1 });
      if (response.data.success) {
        if (fetchCartItems) {
          fetchCartItems();
        }
        console.log(productId);
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
        message: `${quantity} Quantity Added Successfully`,
        type: "success",
      });
    }
  };

  // Quantity Decreament
  const handleDecreament = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity > 1) {
      updateCartItemQuantity(_id, quantity - 1);
      setIsVisible(true);
      setNotification({
        message: `1 Item removed Successfully`,
        type: "success",
      });
    }
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
        <div className="flex gap-2">
          <button
            className="bg-[#16A34A] rounded text-white px-2 font-semibold hover:bg-[#1d8242] hover:text-white"
            onClick={(e) => handleIncreament(e)}
          >
            +
          </button>
          {quantity}
          <button
            className="bg-[#16A34A] rounded text-white px-2 font-semibold hover:bg-[#1d8242] hover:text-white"
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
