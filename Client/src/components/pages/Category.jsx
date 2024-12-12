import React, { useEffect, useState } from "react";
import UploadCategoryModels from "./UploadCategoryModels";
import Loader from "../status/Loader";
import { getCategoryAxios } from "../../Api/Query/userQuery";
import NoData from "./NoData";
import { Link } from "react-router-dom";

const Category = () => {
  const [isUploadCategory, setIsUploadCategory] = useState(false);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategory = async () => {
    setLoading(loading);
    try {
      const response = await getCategoryAxios();

      if (response.data.success) {
        setLoading(false);
        const { categoryProduct } = response.data;
        setCategory(categoryProduct);
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
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
                  className="bg-green-600 text-white px-3 rounded font-medium hover:bg-green-500"
                >
                  Edit
                </Link>
                <button className="bg-red-600 text-white p-1 rounded font-medium hover:bg-red-500">
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
    </section>
  );
};

export default Category;
