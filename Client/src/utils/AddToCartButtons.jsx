import React, { useEffect, useState } from "react";
import useHook from "../hooks/useHook";
import { useSelector } from "react-redux";

const AddToCartButtons = ({ addToCard, productData }) => {
  const { updateCartItemQuantity, fetchCartItems } = useHook();
  const cartItems = useSelector((state) => state.cart);

  const [cartDetails, setCartDetails] = useState();
  const _id = cartDetails?._id;
  const [itemsAvailable, setitemsAvailable] = useState(false);
  const [quantity, setQuantity] = useState("");

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

  // Quantity Increament
  const handleIncreament = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity < productData.stock) {
      updateCartItemQuantity(_id, quantity + 1);
      // fetchCartItems();
    }
  };

  // Quantity Decreament
  const handleDecreament = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity > 0) {
      updateCartItemQuantity(_id, quantity - 1);
      // fetchCartItems();
    }
  };



  return (
    <>
      {!itemsAvailable && (
        <button
          className="mt-2 px-4 py-1 bg-[#F7FFF9] text-[#318616] border border-[#318616] rounded"
          onClick={addToCard}
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
    </>
  );
};

export default AddToCartButtons;
