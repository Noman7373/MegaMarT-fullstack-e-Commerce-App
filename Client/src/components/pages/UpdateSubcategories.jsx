import React, { useEffect, useState } from "react";
import Loader from "../status/Loader";
import uploadImageUtils from "../../utils/uplaodImageUtils";
import { useLocation, useParams } from "react-router-dom";
import { updateSubcategoryAxios } from "../../Api/Query/userQuery";
import useHook from "../../hooks/useHook";

const UpdateSubcategories = () => {
  const { fetchSubCategories, subcategories, fetchCategory } = useHook();

  const { _id } = useParams();
  const location = useLocation();

  const { name, image, category } = location.state || {};

  const [updateSubCategoryData, setUpdateSubCategoryData] = useState({
    _id,
    name,
    image,
    category: category || [],
  });

  console.log("updateSubcategory", updateSubCategoryData.category);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingSubcategory, setLoadingSubcategory] = useState(false);

  // hidden msg after given time
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);

  // fetching subcategories
  useEffect(() => {
    fetchSubCategories();
  }, []);

  // handle go back
  const closeEditPage = () => {
    window.history.back();
  };

  // handle formChange
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUpdateSubCategoryData((prev) => ({ ...prev, [name]: value }));
  };

  // handle ImageChange
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return setErrorMessage("No file Selected");
    }
    setErrorMessage("");
    setLoadingImage(true);
    try {
      const response = await uploadImageUtils({ file });
      const imageUrl = response.data?.uploadImage?.url;
      setLoadingImage(false);
      if (imageUrl) {
        setUpdateSubCategoryData((prev) => ({ ...prev, image: imageUrl }));
        setSuccessMessage(response.data?.message);
      } else {
        setErrorMessage("Image upload failed. No URL returned.");
      }
    } catch (error) {
      setErrorMessage("An error occured", error);
    } finally {
      setLoadingImage(false);
    }
  };

  // handle SubmitForm
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      !updateSubCategoryData.name ||
      !updateSubCategoryData.image ||
      !updateSubCategoryData.category
    ) {
      return setErrorMessage("All fields are requried");
    }
    setErrorMessage("");
    setLoadingSubcategory(true);
    try {
      const response = await updateSubcategoryAxios({
        _id: updateSubCategoryData?._id,
        name: updateSubCategoryData?.name,
        image: updateSubCategoryData?.image,
        category: updateSubCategoryData?.category || [],
      });

      setLoadingSubcategory(false);
      if (response.data.success) {
        setSuccessMessage(response.data.message);
        fetchSubCategories();
        closeEditPage();
      }
    } catch (error) {
      setErrorMessage("An error occured");
    } finally {
      setLoadingSubcategory(false);
    }
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 p-4 flex justify-center z-40 items-center bg-neutral-800 bg-opacity-40">
      <div className="bg-white max-w-4xl w-full p-6 rounded-md shadow-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-semibold text-lg">Edit Sub-Category</h1>
          <button
            onClick={closeEditPage}
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
              placeholder="Enter Subcategory Name"
              className="border border-gray-300 rounded-md p-2 focus:ring focus:ring-indigo-200 outline-none"
              value={updateSubCategoryData.name}
              onChange={handleOnChange}
            />
          </div>

          <div className="flex items-center gap-5 p-3 xs:flex-col sm:flex-row md:flex-row lg:flex-row">
            <div className="w-24">
              {loadingImage ? (
                <Loader />
              ) : updateSubCategoryData?.image &&
                updateSubCategoryData?.image ? (
                <img
                  src={updateSubCategoryData?.image}
                  alt={updateSubCategoryData?.name}
                  className="w-28 h-full object-scale-down"
                />
              ) : (
                <div className="w-full h-full border-2 border-dotted p-5 flex items-center justify-center">
                  <p className="text-center text-gray-500">No Image</p>
                </div>
              )}
            </div>
            <label
              htmlFor="image"
              className="mb-1 font-medium bg-blue-500 p-2 rounded text-white hover:bg-blue-600 cursor-pointer"
            >
              {loadingImage ? "Uploading....." : "Upload Image"}
            </label>
            <input
              type="file"
              name="image"
              id="image"
              required
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              disabled={loadingImage}
            />
          </div>

          {/* <div className="flex flex-wrap gap-2">
            {updateSubCategoryData.category &&
              updateSubCategoryData.category.map((value, index) => {
                return (
                  <div
                    key={value?._id || index}
                    className="flex gap-2 border p-1"
                  >
                    <p>{value?.name}</p>
                    <span
                      className="text-gray-500 hover:text-gray-700 cursor-pointer"
                      //   onClick={() => handleRemoveCategory(value._id)}
                    >
                      ✕
                    </span>
                  </div>
                );
              })}
          </div> */}

          <div className="w-full">
            <select
              className="bg-blue-50 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="category"
              id="category"
              defaultValue=""
              onChange={(e) => {
                const value = e.target.value;
                console.log(value);
              }}
            >
              <option value="" disabled>
                Select Category
              </option>

              {updateSubCategoryData?.category?.map((value, index) => {
                return (
                  <option key={index} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex justify-end">
            {updateSubCategoryData?.image && updateSubCategoryData.name && (
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
              >
                {loadingSubcategory ? "Updating....." : "Update Subcategory"}
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateSubcategories;
