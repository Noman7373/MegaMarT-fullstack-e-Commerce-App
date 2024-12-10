import React, { useState } from "react";

const UploadCategoryModels = ({ closeModel }) => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    image: null,
  });

  // Handle text input change
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCategoryData({
      ...categoryData,
      image: file,
    });
  };

  // Handle form

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", categoryData.image);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 p-4 flex justify-center items-center bg-neutral-800 bg-opacity-40">
      <div className="bg-white max-w-4xl w-full p-6 rounded-md shadow-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-semibold text-lg">Category</h1>
          <button
            onClick={closeModel}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close Modal"
          >
            ✕
          </button>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          {/* Name Field */}
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-medium">
              Name *
            </label>
            <input
              type="text"
              name="name"
              id="name"
              autoFocus
              required
              placeholder="Enter Category Name"
              className="border border-gray-300 rounded-md p-2 focus:ring focus:ring-indigo-200 outline-none"
              value={categoryData.name}
              onChange={handleOnChange}
            />
          </div>

          {/* Image Upload Field */}
          <div className="flex flex-col">
            <label htmlFor="image" className="mb-1 font-medium">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              required
              accept="image/*"
              className="border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={handleImageChange}
            />
            {categoryData.image && (
              <p className="mt-2 text-sm text-gray-600">
                Selected file: {categoryData.image.name}
              </p>
            )}
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModels;
