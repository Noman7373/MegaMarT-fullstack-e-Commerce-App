import React, { useEffect, useState } from "react";
import UploadCategoryModels from "./UploadCategoryModels";
import Loader from "../status/Loader";
import { getCategoryAxios } from "../../Api/Query/userQuery";
import NoData from "./NoData";

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
              className="w-32 h-48 shadow-md rounded cursor-pointer"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full object-scale-down"
              />
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
