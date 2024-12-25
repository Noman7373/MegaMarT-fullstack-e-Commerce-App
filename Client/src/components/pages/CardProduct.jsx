import React from "react";
import { convertPriceBD } from "../../utils/convertPriceInBD";
import { Link } from "react-router-dom";

const CardProduct = ({ categoryProduct }) => {
  return (
    <>
      {" "}
      <Link
        to={`/product-page/${categoryProduct._id}`}
        className="relative border p-2 grid gap-2 lg:gap-3 min-w-36 max-w-40 lg:min-w-52 min-h-[12rem] rounded hover:shadow-lg bg-white"
      >
        <div className="absolute z-10 top-0 left-3 p-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold text-center rounded-[50%] shadow-lg mx-auto animate-pulse">
          <p className="text-sm">25 %</p>
          <p className="text-sm">OFF</p>
        </div>
        <div className="lg:ml-10 min-h-20 max-w-24 lg:max-h-32 rounded mt-[0.75rem] ">
          <img
            src={categoryProduct?.image[0]}
            alt={categoryProduct?.name}
            className="w-full h-full object-scale-down lg:scale-125"
          />
        </div>
        <div className="bg-green-100 text-green-600 rounded text-sm w-fit px-2 mt-4">
          10 mnt
        </div>
        <div className="font-meduim text-ellipsis line-clamp-2 lg:text-[1rem] xs:text-[0.7rem]">
          {categoryProduct?.name}
        </div>
        <div className="w-fit lg:text-[1rem] xs:text-[0.7rem]">
          {categoryProduct?.unit}
        </div>
        <div className="flex items-center justify-between gap-1 lg:gap-3">
          <div className="w-fit font-semibold lg:text-[1rem] xs:text-[0.7rem]">
            {convertPriceBD(categoryProduct?.price)}
          </div>
          <button className="bg-[#F7FFF9] text-[#318616] py-1 px-1 lg:py-1 lg:px-2 rounded border">
            Add
          </button>
        </div>
      </Link>
    </>
  );
};

export default CardProduct;
