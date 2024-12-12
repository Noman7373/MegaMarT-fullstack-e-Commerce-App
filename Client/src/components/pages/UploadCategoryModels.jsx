import React, { useState } from "react";
import { useDispatch } from "react-redux";
import uploadImageUtils from "../../utils/uplaodImageUtils.js";
import { addCategoryAxios } from "../../Api/Query/userQuery";
import { addProductCategory } from "../../store/productSlice.js";

const UploadCategoryModels = ({ closeModel, callFetchCategory }) => {
  const dispatch = useDispatch();

  const [categoryData, setCategoryData] = useState({
    name: "",
    image: null, // Store uploaded image URL here
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingImage, setIsloadingImage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return setErrorMessage("No file Selected");
    }

    setIsloadingImage(true);
    setErrorMessage("");

    try {
      const response = await uploadImageUtils({ file });

      const imageUrl = response.data?.uploadImage?.url;
      setIsloadingImage(false);
      if (imageUrl) {
        setCategoryData((prev) => ({ ...prev, image: imageUrl }));
      } else {
        throw new Error("Image upload failed. No URL returned.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setErrorMessage("An error occurred while uploading the image.");
    } finally {
      setIsloadingImage(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!categoryData.name || !categoryData.image) {
      setErrorMessage("Both name and image are required.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await addCategoryAxios({
        name: categoryData.name,
        image: categoryData.image,
      });

      if (response.data.error) {
        return setErrorMessage(response.data?.message);
      }

      if (response.data.success) {
        const { name, image } = response.data?.categoryProducts;

        setSuccessMessage(response.data?.message);
        dispatch(addProductCategory({ name, image }));
        closeModel();
        callFetchCategory();
      }
    } catch (error) {
      setErrorMessage("An error occurred while saving the category.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 p-4 flex justify-center z-40 items-center bg-neutral-800 bg-opacity-40">
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

        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-sm mb-4">{successMessage}</p>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
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

          <div className="flex items-center gap-5 p-3 xs:flex-col sm:flex-row md:flex-row lg:flex-row">
            <div className="w-24">
              {categoryData?.image && categoryData?.image ? (
                <img
                  src={categoryData?.image}
                  alt={categoryData?.name}
                  className="w-full h-full object-scale-down"
                />
              ) : (
                <div className="w-full h-full border-1 flex items-center justify-center">
                  <p>No Image</p>
                </div>
              )}
            </div>

            <label
              htmlFor="image"
              className="mb-1 font-medium bg-blue-500 p-2 rounded text-white hover:bg-blue-600 cursor-pointer"
            >
              {isLoadingImage ? "Uploading..." : "Upload Image"}
            </label>
            <input
              type="file"
              name="image"
              id="image"
              required
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className={`px-4 py-2 rounded-md text-white ${
                isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModels;
