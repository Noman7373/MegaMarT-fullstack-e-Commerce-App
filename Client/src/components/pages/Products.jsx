import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImageUtils from "../../utils/uplaodImageUtils";
import Loader from "../status/Loader";
import Viewimage from "./Viewimage";
import useHook from "../../hooks/useHook";
import { useSelector } from "react-redux";
import AddMoreFields from "./AddMoreFields";

const Products = () => {
  const allSubcategories = useSelector(
    (state) => state.Products?.allCategories
  );

  const { category, fetchCategory, subcategories, fetchSubCategories } =
    useHook();

  const [isImageOpen, setIsImageOpen] = useState(false);
  const [viewImageURL, setViewImageURL] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [loading, setLoadind] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState("");
  const [selectedSubCategories, setSelectedSubCategories] = useState("");
  const [moreFields, setMoreFields] = useState([]);
  const [isOpenAddField, setIsOpenAddFiled] = useState(false);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    image: [],
    category: [],
    subCategory: [],
    units: "",
    stock: "",
    price: "",
    discount: "",
    more_details: {},
  });

  // fetch Categories
  useEffect(() => {
    fetchCategory();
    fetchSubCategories();
  }, []);

  // Remove Message
  useEffect(() => {
    if (errorMessage || successMsg) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        setSuccessMsg("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMsg]);

  /// handle formOnChange
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
    if (!file) return setErrorMessage("Image not selected");
    setErrorMessage("");
    setLoadingImage(true);
    try {
      const response = await uploadImageUtils({ file });

      const { url } = response.data?.uploadImage;
      if (!url) return setErrorMessage("Image URL undefined");
      setErrorMessage("");
      setLoadingImage(false);
      setSuccessMsg("Image successfully Uplaoded");
      setProductData((prev) => ({ ...prev, image: [...prev.image, url] }));
    } catch (error) {
      setErrorMessage("An error Occurd" || error);
      setSuccessMsg("");
      setLoadingImage(false);
    } finally {
      setLoadingImage(false);
    }
  };

  // Handle Form
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(productData);
  };

  // Handle RemoveImage
  const handleRemoveImage = (indexToRemove) => {
    const filterImages = productData.image.filter(
      (img, idx) => idx !== indexToRemove
    );
    setProductData({
      ...productData,
      image: filterImages,
    });
  };

  //  Handle Remove Selected Category
  const handleRemoveSelectedCategory = (id) => {
    const remaningCategories = productData.category.filter(
      (category) => category._id !== id
    );
    setProductData((prev) => ({
      ...prev,
      category: [...remaningCategories],
    }));
  };

  //  Handle Remove Selected subCategory
  const handleRemoveSelectedSubCategory = (id) => {
    const remaningCategories = productData.subCategory.filter(
      (subCategory) => subCategory._id !== id
    );
    setProductData((prev) => ({
      ...prev,
      subCategory: [...remaningCategories],
    }));
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
                required
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
                required
                rows={3}
                value={productData.description}
                onChange={onChangeHandle}
              ></textarea>
            </div>

            {/* Image Upload */}

            <p>Image *</p>

            {errorMessage && (
              <div className="mt-2 text-red-500">{errorMessage}</div>
            )}
            {successMsg && (
              <div className="mt-2 text-green-500">{successMsg}</div>
            )}

            <label
              htmlFor="image"
              className="p-2 bg-[#EFF6FF] rounded flex flex-col justify-center items-center cursor-pointer"
            >
              <FaCloudUploadAlt size={35} />
              <h1>{loadingImage ? "Uploading....." : "Upload Image"}</h1>
            </label>
            {/*Show All selected Images */}
            <div className="flex justify-start items-start gap-2 flex-wrap w-full py-2">
              {loadingImage ? (
                <Loader />
              ) : (
                productData.image.map((img, index) => {
                  return (
                    <>
                      <div className="relative group">
                        <img
                          className="w-20 cursor-pointer"
                          key={img + index}
                          src={img}
                          alt="productImage"
                          onClick={() => {
                            setViewImageURL(img);
                            setIsImageOpen(true);
                          }}
                        />

                        <span
                          className="bg-red-500 rounded-[50%] text-white absolute top-0  right-0 px-1 cursor-pointer hover:bg-red-700 hidden group-hover:block"
                          onClick={() => handleRemoveImage(index)}
                        >
                          ✕
                        </span>
                      </div>
                      {isImageOpen && (
                        <Viewimage
                          imageSrc={viewImageURL}
                          altText="Product-Image"
                          closeModel={() => setIsImageOpen(false)}
                        />
                      )}
                    </>
                  );
                })
              )}
            </div>

            {/* Image */}
            <input
              type="file"
              id="image"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            {/* Category */}
            <div className="flex flex-col gap-1">
              <label>Category *</label>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 flex-wrap">
                  {productData.category.map((selectCat, index) => (
                    <span key={index} className="flex gap-1 border">
                      <p>{selectCat.name}</p>
                      <span
                        className="cursor-pointer hover:text-gray-700"
                        onClick={() =>
                          handleRemoveSelectedCategory(selectCat._id)
                        }
                      >
                        ✕
                      </span>
                    </span>
                  ))}
                </div>
                <select
                  name="category"
                  id="category"
                  defaultValue=""
                  className="bg-blue-50 w-full border rounded px-2 py-1 outline-none focus:border-yellow-300"
                  value={selectedCategories}
                  // required
                  onChange={(e) => {
                    const value = e.target.value;
                    const findCategory = category.find(
                      (val) => val._id === value
                    );
                    if (findCategory) {
                      setProductData((prev) => {
                        return {
                          ...prev,
                          category: [...prev.category, findCategory],
                        };
                      });
                      setSelectedCategories("");
                    }
                  }}
                >
                  <option value="" disabled>
                    Select Category
                  </option>

                  {category.map((cat) => {
                    return (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* Subcategory */}
            <div className="flex flex-col gap-1">
              <label className="mt-2">Subcategory *</label>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 flex-wrap">
                  {productData.subCategory.map((selectCat, index) => (
                    <span key={index} className="flex gap-1 border">
                      <p>{selectCat.name}</p>
                      <span
                        className="cursor-pointer hover:text-gray-700"
                        onClick={() =>
                          handleRemoveSelectedSubCategory(selectCat._id)
                        }
                      >
                        ✕
                      </span>
                    </span>
                  ))}

                  <select
                    name="subcategory"
                    id="subcategory"
                    defaultValue=""
                    value={selectedSubCategories}
                    className="bg-blue-50 w-full border rounded px-2 py-1 outline-none focus:border-yellow-300"
                    onChange={(e) => {
                      const optionValue = e.target.value;
                      const findSubcategory = subcategories.find(
                        (subCate) => subCate._id === optionValue
                      );

                      if (findSubcategory) {
                        const { _id, name } = findSubcategory;
                        setProductData((prev) => {
                          return {
                            ...prev,
                            subCategory: [...prev.subCategory, { _id, name }],
                          };
                        });
                        setSelectedCategories("");
                      }
                    }}
                  >
                    <option value="" disabled>
                      Select Subcategory
                    </option>

                    {subcategories.map((subcat, index) => (
                      <option key={index || subcat._id} value={subcat._id}>
                        {subcat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Units */}
            <div className="flex flex-col gap-1">
              <label htmlFor="units">Units *</label>
              <input
                type="text"
                id="units"
                name="units"
                placeholder="Enter units"
                value={productData.units}
                onChange={onChangeHandle}
                // required
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
                required
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
                required
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

            <div
              className="mt-3 p-2 bg-blue-500 text-center max-w-[8rem] text-white rounded cursor-pointer hover:bg-blue-400"
              onClick={() => setIsOpenAddFiled(true)}
            >
              Add Fields
            </div>
            {/* Add-more fields Box Open*/}

            {isOpenAddField && (
              <AddMoreFields closePage={() => setIsOpenAddFiled(false)} />
            )}

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
