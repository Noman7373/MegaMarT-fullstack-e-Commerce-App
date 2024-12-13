import React, { useState } from "react";
import uploadImageUtils from "../../utils/uplaodImageUtils";

const UploadSubcategory = ({ close }) => {
  const [subCategoryDate, setSubCategoryData] = useState({
    name: "",
    image: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loadingImage, setLaodingImage] = useState(false);
  const [loadingSubcategory, serLoadingSubCategory] = useState(false);

  // handle Onchange
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setSubCategoryData({
      ...subCategoryDate,
      [name]: value,
    });
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

      console.log(response);

      const imageURL = response.data?.uploadImage.url;

      if (!imageURL) {
        return setErrorMessage("Image not selected");
      }

      setSubCategoryData(imageURL);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();



    

    try {
    } catch (error) {
      setErrorMessage("An error occured" || error);
    }
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
              placeholder="Enter Category Name"
              className="border border-gray-300 rounded-md p-2 focus:ring focus:ring-indigo-200 outline-none"
              value={subCategoryDate.name}
              onChange={handleOnChange}
            />
          </div>

          <div className="flex items-center gap-5 p-3 xs:flex-col sm:flex-row md:flex-row lg:flex-row">
            <div className="w-24">
              <div className="w-full h-full border-1 flex items-center justify-center">
                <p>No Image</p>
              </div>
            </div>

            <label
              htmlFor="image"
              className="mb-1 font-medium bg-blue-500 p-2 rounded text-white hover:bg-blue-600 cursor-pointer"
            >
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              required
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              //   disabled={isLoading}
            />
          </div>

          <div className="flex justify-end">
            <button type="submit" className=" px-4 py-2 rounded-md text-white">
              Add Subcategory
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UploadSubcategory;
