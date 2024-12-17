import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImageUtils from "../../utils/uplaodImageUtils";

const Products = () => {
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [loading, setLoadind] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    units: [],
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  });

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // handle Image Upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return setError("Image not selected");
    setError("");
    try {
      const response = await uploadImageUtils({ file });
      const { imageURL } = response.data?.uploadImage;
      if (!imageURL) return setError("Image URL Error");
      setError("");
      setProductData((prev) => ({ ...prev, image: imageURL }));
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Form
  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section>
        <div className="flex p-2 bg-white shadow-md flex-col">
          <h1 className="font-semibold">Add Products</h1>
        </div>

        <div className="p-2 overflow-y-auto h-[54vh] py-5 custom-scrollbar">
          <form className="space-y-4" onSubmit={handleOnSubmit}>
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Product Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={productData.name}
                onChange={onChangeHandle}
                placeholder="Enter Product Name"
                autoFocus
                autoComplete="name"
                className="bg-blue-50 border rounded px-2 py-1 outline-none focus:border-yellow-300"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1 mt-4">
              <label htmlFor="description">Description *</label>
              <textarea
                className="bg-blue-50 border w-full rounded px-2 py-1 outline-none resize-none focus:border-yellow-300"
                name="description"
                id="description"
                placeholder="description....."
                rows={3}
                value={productData.description}
                onChange={onChangeHandle}
              ></textarea>
            </div>

            {/* Image Upload */}

            <p>Image *</p>

            <label
              htmlFor="image"
              className="p-2 bg-[#EFF6FF] rounded flex flex-col justify-center items-center cursor-pointer"
            >
              <FaCloudUploadAlt size={35} />
              <h1>Upload Image</h1>

              {/*Show All selected Images */}
              {/* <div className="flex justify-start items-start w-full">
                <h1>Show All Selected Images</h1>
              </div> */}
            </label>

            <input
              type="file"
              id="image"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            {/* Units */}
            <div className="flex flex-col gap-1">
              <label htmlFor="unit">Units *</label>
              <input
                type="text"
                id="unit"
                name="unit"
                value={productData.units}
                onChange={onChangeHandle}
                placeholder="Enter Product Units"
                autoComplete="units"
                className="bg-blue-50 border rounded px-2 py-1 outline-none focus:border-yellow-300"
              />
            </div>
            {/* Stocks */}
            <div className="flex flex-col gap-1">
              <label htmlFor="stock">Stocks *</label>
              <input
                type="text"
                id="stock"
                name="stock"
                value={productData.stock}
                onChange={onChangeHandle}
                placeholder="Enter Stock"
                autoComplete="stock"
                className="bg-blue-50 border rounded px-2 py-1 outline-none focus:border-yellow-300"
              />
            </div>
            {/* Price */}
            <div className="flex flex-col gap-1">
              <label htmlFor="price">Price*</label>
              <input
                type="number"
                id="price"
                name="price"
                value={productData.price}
                onChange={onChangeHandle}
                placeholder="Enter Product Price"
                autoComplete="price"
                className="bg-blue-50 border rounded px-2 py-1 outline-none focus:border-yellow-300"
              />
            </div>
            {/* Discount */}
            <div className="flex flex-col gap-1">
              <label htmlFor="discount">Discount</label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={productData.discount}
                onChange={onChangeHandle}
                placeholder="Enter Product Discount"
                autoComplete="discount"
                className="bg-blue-50 border rounded px-2 py-1 outline-none focus:border-yellow-300"
              />
            </div>

            {/* More_Details */}

            <div className="text-center">
              <button className="p-2 w-full bg-green-500 text-white rounded hover:bg-green-700">
                Add Product
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Products;
