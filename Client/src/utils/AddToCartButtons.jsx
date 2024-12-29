import React, { useEffect, useState } from "react";
import useHook from "../hooks/useHook";
import { useSelector } from "react-redux";

const AddToCartButtons = ({ addToCard, productData }) => {
  const { updateCartItemQuantity } = useHook();
  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);

  //   const getQuantity = cartItems.cart.map((cart) => cart.quantity);
  //   console.log(getQuantity);

  const [itemsAvailable, setitemsAvailable] = useState(false);
  const [quantity, setQuantity] = useState(0);

  // checkProduct
  useEffect(() => {
    const getCartArray = cartItems.cart.map((cart) => cart.productId);
    const checkProduct = getCartArray.some(
      (cart) => cart._id === productData._id
    );

    setitemsAvailable(checkProduct);
  }, [productData, cartItems]);

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
          <button className="bg-[#16A34A] rounded text-white px-2 font-semibold hover:bg-transparent hover:text-black hover:border">
            +
          </button>

          <button className="bg-[#16A34A] rounded text-white px-2 font-semibold">
            -
          </button>
        </div>
      )}
    </>
  );
};

export default AddToCartButtons;
