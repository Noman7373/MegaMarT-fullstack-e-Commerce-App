import React, { useState } from "react";
import UploadCategoryModels from "./UploadCategoryModels";

const Category = () => {
  const [isUploadCategory, setIsUploadCategory] = useState(false);
  return (
    <section>
      <div className="flex justify-between items-center p-2 bg-white shadow-md">
        <h1 className="font-semibold">Category</h1>
        <button
          onClick={() => setIsUploadCategory(true)}
          className="bg-green-600 p-2 text-white rounded hover:bg-green-700"
        >
          Add Category
        </button>
      </div>
      {isUploadCategory && (
        <UploadCategoryModels closeModel={() => setIsUploadCategory(false)} />
      )}
    </section>
  );
};

export default Category;
