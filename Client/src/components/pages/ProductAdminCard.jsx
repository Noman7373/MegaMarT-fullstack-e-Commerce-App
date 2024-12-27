import React, { useEffect, useState } from "react";
import DeleteConfirmation from "../../utils/DeleteConfirmation";
import EditProduct from "./EditProduct";
import { deleteProductAxios } from "../../Api/Query/userQuery";

const ProductAdminCard = ({ showProducts, index, callProduct }) => {
  const [isOpenEditProduct, setIsOpenEditProduct] = useState(false);
  const [isOpenDeleteProduct, setIsOpenDeleteProduct] = useState(false);

  // const { _id } = showProducts;
  const confirmDelete = async (_id) => {
    try {
      const response = await deleteProductAxios({
        _id,
      });
      if (response.data.success) {
        callProduct();
        setIsOpenDeleteProduct(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div
        key={showProducts?._id || index}
        className="w-32 h-[13rem] p-2 bg-white rounded ml-1 group flex flex-col gap-2 shadow-md"
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
          <button
            className="bg-[#318616] text-white px-2 py-1 border border-[#318616] rounded hover:bg-transparent hover:text-black"
            onClick={() => setIsOpenEditProduct(true)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-1 py-1 border border-red-500 rounded hover:bg-transparent hover:text-black"
            onClick={() => setIsOpenDeleteProduct(true)}
          >
            Delete
          </button>
        </div>
      </div>

      {isOpenDeleteProduct && (
        <DeleteConfirmation
          isOpen={isOpenDeleteProduct}
          onClose={() => setIsOpenDeleteProduct(false)}
          onConfirm={() => confirmDelete(showProducts._id)}
        />
      )}

      {isOpenEditProduct && (
        <EditProduct
          fetchProduct={callProduct}
          products={showProducts}
          onClose={() => setIsOpenEditProduct(false)}
        />
      )}
    </>
  );
};

export default ProductAdminCard;
