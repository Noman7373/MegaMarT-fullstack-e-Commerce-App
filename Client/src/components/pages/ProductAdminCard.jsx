import React from "react";

const ProductAdminCard = ({ showProducts, index }) => {
  return (
    <>
      <div
        key={showProducts?._id || index}
        className="w-32 h-[13rem] p-2 bg-white rounded ml-1 group flex flex-col gap-2"
      >
        <div>
          <img
            src={showProducts?.image[0]}
            alt={showProducts?.name}
            className="w-full h-full object-scale-down"
          />
        </div>
        <p>{showProducts?.name.slice(0, 10)}....</p>
        <div className="group-hover:flex justify-between-between items-center gap-2 mt-2 hidden">
          <button className="bg-[#318616] text-white px-2 py-1 border border-[#318616] rounded hover:bg-transparent hover:text-black">
            Edit
          </button>
          <button className="bg-red-500 text-white px-1 py-1 border border-red-500 rounded hover:bg-transparent hover:text-black">
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductAdminCard;
