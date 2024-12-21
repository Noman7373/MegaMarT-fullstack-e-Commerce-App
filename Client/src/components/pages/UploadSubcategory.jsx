import React, { useEffect, useState } from "react";
import uploadImageUtils from "../../utils/uplaodImageUtils";
import { addSubCategoryAxios } from "../../Api/Query/userQuery";
import Loader from "../status/Loader";
import useHook from "../../hooks/useHook";
import { useDispatch, useSelector } from "react-redux";
import { addSubcategory } from "../../store/productSlice";

const UploadSubcategory = ({ close }) => {
  const dispatch = useDispatch();
  // custom hook
  const { fetchCategory, fetchSubCategories } = useHook();

  const allCategories = useSelector((state) => state.Products?.allCategories);
  // console.log("UploadSubcategory", allCategories);

  const [subCategoryDate, setSubCategoryData] = useState({
    name: "",
    image: null,
    category: [],
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loadingImage, setLaodingImage] = useState(false);
  const [loadingSubcategory, setLoadingSubCategory] = useState(false);

  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);

  useEffect(() => {
    fetchCategory();
  }, []);

  // Reset Form
  const resetForm = () => {
    setSubCategoryData({ name: "", image: null, category: [] });
    setErrorMessage("");
    setSuccessMessage("");
    close();
  };

  // handle Onchange
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSubCategoryData((prev) => ({ ...prev, [name]: value }));
  };

  //    handle ImageChange
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return setErrorMessage("No file Selected");
    }
    setErrorMessage("");
    setLaodingImage(true);
    try {
      const response = await uploadImageUtils({ file });
      setLaodingImage(false);
      const imageURL = response.data?.uploadImage.url;

      if (!imageURL) {
        return setErrorMessage("Image not selected");
      }
      setSubCategoryData((prev) => ({ ...prev, image: imageURL }));
      setSuccessMessage("Image uploaded successfully");
    } catch (error) {
      setErrorMessage(error);
    }
  };

  // Handle Subcategory Submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!subCategoryDate.name || !subCategoryDate.image) {
      return setErrorMessage("All fields are requried");
    }
    setErrorMessage("");
    setLoadingSubCategory(true);
    try {
      const response = await addSubCategoryAxios({
        name: subCategoryDate.name,
        image: subCategoryDate.image,
        category: subCategoryDate.category,
      });
      // console.log(response);

      setLoadingSubCategory(false);
      if (response.data.success) {
        fetchSubCategories();
        close();
        resetForm();
      }
    } catch (error) {
      setErrorMessage("An error occured" || error);
    } finally {
      setLoadingSubCategory(false);
    }
  };

  // handle remove select subcategory
  const handleRemoveCategory = (id) => {
    const updatedCategories = subCategoryDate.category.filter(
      (el) => el._id !== id
    );
    setSubCategoryData((prev) => ({
      ...prev,
      category: updatedCategories,
    }));
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 p-4 flex justify-center z-40 items-center bg-neutral-800 bg-opacity-40">
      <div className="bg-white max-w-4xl w-full p-6 rounded-md shadow-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-semibold text-lg">Sub-Category</h1>
          <button
            onClick={close}
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
              value={subCategoryDate.name}
              onChange={handleOnChange}
            />
          </div>

          <div className="flex items-center gap-5 p-3 xs:flex-col sm:flex-row md:flex-row lg:flex-row">
            <div className="w-24">
              {loadingImage ? (
                <Loader />
              ) : subCategoryDate?.image && subCategoryDate?.image ? (
                <img
                  src={subCategoryDate?.image}
                  alt={subCategoryDate?.name}
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

          <div className="flex flex-wrap gap-2">
            {subCategoryDate.category &&
              subCategoryDate.category.map((value, index) => {
                return (
                  <div
                    key={value?._id || index}
                    className="flex gap-2 border p-1"
                  >
                    <p>{value?.name}</p>
                    <span
                      className="text-gray-500 hover:text-gray-700 cursor-pointer"
                      onClick={() => handleRemoveCategory(value?._id)}
                    >
                      ✕
                    </span>
                  </div>
                );
              })}
          </div>

          <div className="w-full">
            <select
              className="bg-blue-50 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="category"
              id="categories"
              defaultValue=""
              onChange={(e) => {
                const value = e.target.value;
                const findCategory = allCategories.find(
                  (el) => el.name === value
                );

                if (
                  findCategory &&
                  !subCategoryDate.category.some(
                    (el) => el._id === findCategory._id
                  )
                ) {
                  dispatch(addSubcategory([...findCategory]));
                  console.log("success");
                  const { _id, name } = findCategory;
                  console.log(name);

                  setSubCategoryData((prev) => ({
                    ...prev,
                    category: [...prev.category, { name, _id }],
                  }));
                }
              }}
            >
              <option value="" disabled>
                Select Category
              </option>
              {allCategories.map((cate) => {
                return (
                  <option key={cate?._id} value={cate?._name}>
                    {cate?.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex justify-end">
            {subCategoryDate?.image && subCategoryDate.name && (
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
              >
                {loadingSubcategory ? "Adding....." : "Add Subcategory"}
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default UploadSubcategory;
