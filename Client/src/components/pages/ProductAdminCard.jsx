import React from "react";

const ProductAdminCard = ({ showProducts, index }) => {
  return (
    <>
      <div
        key={showProducts?._id || index}
        className="w-32 p-2 bg-white rounded ml-1"
      >
        <div>
          <img
            src={showProducts?.image[0]}
            alt={showProducts?.name}
            className="w-full h-full object-scale-down"
          />
        </div>
        <p>{showProducts?.name.slice(0, 20)}....</p>
        <p className="text-gray-400">{showProducts?.unit}</p>
      </div>
    </>
  );
};

export default ProductAdminCard;
