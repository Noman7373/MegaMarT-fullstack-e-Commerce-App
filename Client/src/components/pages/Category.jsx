import React, { useEffect, useState } from "react";
import UploadCategoryModels from "./UploadCategoryModels";
import AllLoader from "../../utils/AllLoader.jsx";
import NoData from "./NoData";
import { Link } from "react-router-dom";

import useHook from "../../hooks/useHook";
import DeleteConfirmation from "../../utils/DeleteConfirmation";
import { deleteCategoryAxios } from "../../Api/Query/userQuery";

const Category = () => {
  // custom hook
  const { fetchCategory, category, loading } = useHook();
  const [isUploadCategory, setIsUploadCategory] = useState(false);

  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  const handleDelete = () => {
    setIsDeletePopupOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteCategoryAxios({
        _id: categoryId,
      });
      if (response.data.success) {
        fetchCategory();
        setIsDeletePopupOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <section>
      <div className="flex justify-between items-center p-2 bg-white shadow-md ">
        <h1 className="font-semibold">Category</h1>
        <button
          onClick={() => setIsUploadCategory(true)}
          className="bg-green-600 p-2 text-white rounded hover:bg-green-700"
        >
          Add Category
        </button>
      </div>
      {loading && <AllLoader />}

      {!category[0] && !loading && <NoData />}

      <div className="p-4 grid xs:grid-cols-2 xs:gap-6 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-2 h-[20rem] overflow-y-auto custom-scrollbar">
        {category.map((category, index) => {
          return (
            <div
              key={index}
              className="w-36 h-56 p-1 shadow-md rounded cursor-pointer group"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-44 object-scale-down"
              />
              <div className="justify-between gap-2 hidden group-hover:flex mt-1">
                <Link
                  to={`/dashboard/edit-category/${category._id}`}
                  state={{ category }}
                  className="bg-[#318616] text-white px-2 py-1 border border-[#318616] rounded hover:bg-transparent hover:text-black"
                >
                  Edit
                </Link>
                <button
                  className="bg-red-500 text-white px-1 py-1 border border-red-500 rounded hover:bg-transparent hover:text-black"
                  onClick={() => {
                    setCategoryId(category._id);
                    handleDelete();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {isUploadCategory && (
        <UploadCategoryModels
          callFetchCategory={fetchCategory}
          closeModel={() => setIsUploadCategory(false)}
        />
      )}

      {isDeletePopupOpen && (
        <DeleteConfirmation
          isOpen={isDeletePopupOpen}
          onClose={() => setIsDeletePopupOpen(false)}
          onConfirm={confirmDelete}
        />
      )}
    </section>
  );
};

export default Category;
