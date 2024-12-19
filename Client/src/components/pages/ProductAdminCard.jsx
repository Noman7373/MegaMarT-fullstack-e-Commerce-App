import React from "react";

const ProductAdminCard = ({ showProducts, index }) => {
  return (
    <>
      <div key={showProducts?._id || index} className="w-36 p-2 bg-white">
        <div>
          <img
            src={showProducts?.image[0]}
            alt={showProducts?.name}
            className="w-full h-full object-scale-down"
          />
        </div>
        <p>{showProducts?.name}</p>
        <p className="text-gray-400">{showProducts?.unit}</p>
      </div>
    </>
  );
};

export default ProductAdminCard;
