import React, { useEffect, useState } from "react";
import UploadCategoryModels from "./UploadCategoryModels";
import Loader from "../status/Loader";
import NoData from "./NoData";
import { Link } from "react-router-dom";
import DeleteConfirm from "../pages/DeleteConfirm";
import useHook from "../../hooks/useHook";

const Category = () => {
  // custom hook
  const { fetchCategory, category, loading } = useHook();
  const [isUploadCategory, setIsUploadCategory] = useState(false);

  const [isdeleteOpen, setIsdeleteOpen] = useState(false);
  const [id, setId] = useState("");

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
      {loading && <Loader />}

      {!category[0] && !loading && <NoData />}

      <div className="p-4 grid xs:grid-cols-2 xs:gap-6 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-2">
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
                  className="text-center flex justify-center items-center bg-green-600 text-white px-3 rounded font-medium hover:bg-green-500"
                >
                  Edit
                </Link>
                <button
                  className="bg-red-600 text-white p-1 rounded font-medium hover:bg-red-500"
                  onClick={() => {
                    setIsdeleteOpen(true);
                    setId(category._id);
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

      {isdeleteOpen && (
        <DeleteConfirm
          closeDelete={() => setIsdeleteOpen(false)}
          categoryId={id}
          fetchCategory={fetchCategory}
        />
      )}
    </section>
  );
};

export default Category;
