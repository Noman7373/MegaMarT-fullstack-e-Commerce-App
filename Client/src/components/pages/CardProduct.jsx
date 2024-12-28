import React, { useState } from "react";
import { convertPriceBD } from "../../utils/convertPriceInBD";
import { Link } from "react-router-dom";
import { createCartAxios } from "../../Api/Query/userQuery";
import CustomNotification from "../../utils/CustomNotification";

const CardProduct = ({ categoryProduct }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  // handle AddToCart item API
  const handleAddToCartItem = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await createCartAxios({ productId, quantity: 1 });
      if (response.data.success) {
        setMessage("Product added to cart successfully!");
        setType("success");
        setIsVisible(true);
      }
    } catch (error) {
      setMessage(error.message);
      setType("error");
      setIsVisible(true);
    }
  };

  return (
    <>
      {" "}
      <Link
        to={`/product-page/${categoryProduct._id}`}
        className="relative  border p-2 grid gap-2 lg:gap-3  max-w-40 lg:min-w-52 min-h-[12rem] rounded hover:shadow-lg bg-white"
      >
        {Boolean(categoryProduct.discount) && (
          <div className="absolute z-10 top-0 left-3 p-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold text-center rounded-[50%] shadow-lg mx-auto animate-pulse">
            <p className="text-sm">{categoryProduct.discount}%</p>
            <p className="text-sm">OFF</p>
          </div>
        )}
        <div className="lg:ml-10 min-h-20 max-w-24 lg:max-h-32 rounded mt-[0.75rem] ">
          <img
            src={categoryProduct?.image[0]}
            alt={categoryProduct?.name}
            className="w-full h-full object-scale-down lg:scale-125"
          />
        </div>
        <div className="bg-green-100 text-green-600 rounded text-sm w-fit px-2 mt-4">
          10 MINS
        </div>
        <div className="font-meduim text-ellipsis line-clamp-2 lg:text-[1rem] xs:text-[0.7rem]">
          {categoryProduct?.name}
        </div>
        <div className="w-fit lg:text-[0.9rem]  xs:text-[0.7rem]">
          {categoryProduct?.unit}
        </div>
        <div className="flex items-center justify-between gap-1 lg:gap-3">
          <div className="w-fit flex flex-col gap-2">
            <p className="font-semibold lg:text-[0.8rem] xs:text-[0.7rem]">
              {convertPriceBD(categoryProduct?.price)}
            </p>
            {/* {Boolean(categoryProduct.discount) && (
              <p className="">{categoryProduct?.discount}</p>
            )} */}
          </div>
          {categoryProduct.stock > 0 ? (
            <button
              className="mt-2 px-4 py-1 bg-[#F7FFF9] text-[#318616] border border-[#318616] rounded"
              onClick={(e) => handleAddToCartItem(e, categoryProduct._id)}
            >
              Add
            </button>
          ) : (
            <p className="text-red-500 bg-[#F7FFF9] rounded text-center animate-pulse">
              Out of stock
            </p>
          )}
        </div>
      </Link>
      {/* Custom Notification Component */}
      <CustomNotification
        Notification={{ isVisible, message, type, setIsVisible }}
      />
    </>
  );
};

export default CardProduct;
