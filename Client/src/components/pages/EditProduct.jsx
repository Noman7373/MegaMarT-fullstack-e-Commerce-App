import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import Loader from "../status/Loader";
import useHook from "../../hooks/useHook";
import AddMoreFields from "./AddMoreFields";
import { useSelector } from "react-redux";
import Viewimage from "./Viewimage";
import uploadImageUtils from "../../utils/uplaodImageUtils";
import { updateProductAxios } from "../../Api/Query/userQuery";

const EditProduct = ({ products, fetchProduct, onClose }) => {
  const allCategory = useSelector((state) => state?.Products?.allCategories);
  const allSubcategories = useSelector(
    (state) => state?.Products?.allSubcategories
  );

  const [productData, setProductData] = useState({
    _id: products._id,
    name: products.name,
    image: products.image || [],
    description: products.description,
    category: products.categor || [],
    subCategory: products.subCategory || [],
    unit: products.unit,
    stock: products.stock,
    price: products.price,
    discount: products.discount,
    more_details: products.more_details || {},
  });

  //   use Hook
  const { fetchCategory, fetchSubCategories } = useHook();

  const [isImageOpen, setIsImageOpen] = useState(false);
  const [viewImageURL, setViewImageURL] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [loading, setLoadind] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState("");
  const [selectedSubCategories, setSelectedSubCategories] = useState("");
  const [isOpenAddField, setIsOpenAddFiled] = useState(false);
  const [fieldName, setFieldName] = useState("");

  // fetchProduct
  useEffect(() => {
    fetchProduct();
    fetchCategory();
    fetchSubCategories();
  }, []);

  const handleRemoveImage = (indexToRemove) => {
    const filterImages = productData.image.filter(
      (idx) => idx !== indexToRemove
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

  // handle Add Fields
  const handleAddFields = () => {
    setProductData((prev) => {
      return {
        ...prev,
        more_details: {
          ...prev.more_details,
          [fieldName]: "",
        },
      };
    });
    setFieldName("");
    setIsOpenAddFiled(false);
  };

  // handle Remove Fields
  const handleRemoveFields = (fieldName) => {
    setProductData((prev) => {
      const updateDetailts = { ...prev.more_details };
      delete updateDetailts[fieldName];
      return { ...prev, more_details: updateDetailts };
    });
  };

  // Reset Form
  const resetForm = () => {
    setProductData({
      name: "",
      image: [],
      description: "",
      category: [],
      subCategory: [],
      unit: "",
      stock: "",
      price: "",
      discount: "",
      more_details: {},
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

  // handle Onchange
  const onChangeHandle = (e) => {
    const { value, name } = e.target;

    setProductData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoadind(true);
    try {
      const response = await updateProductAxios({
        _id: products._id,
        name: productData.name,
        image: productData.image || [],
        description: productData.description,
        category: productData.category || [],
        subCategory: productData.subCategory || [],
        unit: productData.unit,
        stock: productData.stock,
        price: productData.price,
        discount: productData.discount,
        more_details: productData.more_details,
      });
      setLoadind(false);

      if (response.data.success) {
        resetForm();
        setSuccessMsg("Product added successfully!");
        fetchProduct();
        onClose();
        console.log("success");
      }
    } catch (error) {
      setErrorMessage(
        error?.message || "An error occurred while adding the product"
      );
      setLoadind(false);
    } finally {
      setLoadind(false); // Ensure loading is stopped after try/catch block
    }
  };
  return (
    <section>
      <div className="flex p-2 bg-white shadow-md flex-col">
        <h1 className="font-semibold">Add Products</h1>
        {errorMessage && (
          <div className="mt-2 text-red-500">{errorMessage}</div>
        )}
        {successMsg && <div className="mt-2 text-green-500">{successMsg}</div>}
      </div>

      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center top-0 left-0 right-0 bottom-0 z-40 items-center">
        <div className="px-5 overflow-y-auto h-full py-5 custom-scrollbar bg-white ">
          <form className="space-y-4" onSubmit={handleOnSubmit}>
            {/* Name */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-end items-end">
                <button
                  onClick={onClose}
                  className="text-gray-500 text-xl hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <label htmlFor="name" className="font-semibold">
                Product Name *
              </label>
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
              <label htmlFor="description" className="font-semibold">
                Description *
              </label>
              <textarea
                className="bg-blue-50 border w-full rounded px-2 py-1 outline-none resize-none focus:border-yellow-300"
                name="description"
                id="description"
                placeholder="description....."
                required
                rows={10}
                value={productData.description}
                onChange={onChangeHandle}
              ></textarea>
            </div>
            {/* Image Upload */}
            <p className="font-semibold">Image *</p>
            <label
              htmlFor="image"
              className="p-2 bg-[#EFF6FF] rounded flex flex-col justify-center items-center cursor-pointer"
            >
              <FaCloudUploadAlt size={35} />
              <h1>{loadingImage ? "Uploading....." : "Upload Image"}</h1>
            </label>
            {/*Show All selected Images */}
            <div className="flex justify-start items-start gap-2 flex-wrap w-full py-2">
              {productData.image.map((img, index) => {
                return (
                  <>
                    <div
                      key={img || index + "EditPage"}
                      className="relative group"
                    >
                      <img
                        className="w-20 cursor-pointer"
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
              })}
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
              <label htmlFor="category" className="font-semibold">
                Category *
              </label>
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
                  className="bg-blue-50 w-full border rounded px-2 py-1 outline-none focus:border-yellow-300"
                  value={selectedCategories}
                  onChange={(e) => {
                    const value = e.target.value;
                    const findCategory = allCategory.find(
                      (val) => val._id === value
                    );
                    if (findCategory) {
                      setProductData((prev) => ({
                        ...prev,
                        category: [...prev.category, findCategory],
                      }));
                      setSelectedCategories("");
                    }
                  }}
                >
                  <option value="" disabled>
                    Select Category
                  </option>

                  {allCategory.map((cat) => {
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
              <label htmlFor="subCategory" className="mt-2 font-semibold">
                Subcategory *
              </label>
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
                    name="subCategory"
                    id="subCategory"
                    value={selectedSubCategories}
                    className="bg-blue-50 w-full border rounded px-2 py-1 outline-none focus:border-yellow-300"
                    onChange={(e) => {
                      const optionValue = e.target.value;
                      const findSubcategory = allSubcategories.find(
                        (subCate) => subCate._id === optionValue
                      );

                      if (findSubcategory) {
                        setProductData((prev) => ({
                          ...prev,
                          subCategory: [...prev.subCategory, findSubcategory],
                        }));
                        setSelectedSubCategories("");
                      }
                    }}
                  >
                    <option value="" disabled>
                      Select Subcategory
                    </option>

                    {allSubcategories.map((subcat, index) => (
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
              <label htmlFor="unit" className="font-semibold">
                Units *
              </label>
              <input
                type="text"
                id="unit"
                name="unit"
                placeholder="Enter units"
                value={productData.unit}
                onChange={onChangeHandle}
                // required
                className="bg-blue-50 border rounded px-2 py-1 outline-none focus:border-yellow-300"
              />
            </div>
            {/* Stocks */}
            <div className="flex flex-col gap-1">
              <label htmlFor="stock" className="font-semibold">
                Stocks *
              </label>
              <input
                type="number"
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
              <label htmlFor="price" className="font-semibold">
                Price *
              </label>
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
              <label htmlFor="discount" className="font-semibold">
                Discount
              </label>
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
            {/* display extra Fields */}
            {Object.keys(productData?.more_details)?.map((fields, index) => {
              return (
                <div key={index} className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <label htmlFor={fields} className="font-semibold">
                      {fields}
                    </label>
                    <span
                      className="text-[1.4rem] cursor-pointer hover:text-gray-700"
                      onClick={() => handleRemoveFields(fields)}
                    >
                      ✕
                    </span>
                  </div>
                  <input
                    type="text"
                    id={fields}
                    name={fields}
                    value={productData?.more_details[fields]}
                    onChange={(e) => {
                      const fieldValue = e.target.value;
                      setProductData((prev) => {
                        return {
                          ...prev,
                          more_details: {
                            ...prev.more_details,
                            [fields]: fieldValue,
                          },
                        };
                      });
                    }}
                    placeholder={`Enter Product ${fields}`}
                    className="bg-blue-50 border rounded px-2 py-1 outline-none focus:border-yellow-300"
                  />
                </div>
              );
            })}
            <div
              className="mt-3 p-2 bg-blue-500 text-center max-w-[8rem] text-white rounded cursor-pointer hover:bg-blue-400"
              onClick={() => setIsOpenAddFiled(true)}
            >
              Add Fields
            </div>

            {isOpenAddField && (
              <AddMoreFields
                closePage={() => setIsOpenAddFiled(false)}
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                onSubmit={handleAddFields}
              />
            )}
            <div className="text-center">
              <button className="p-2 w-full bg-green-500 text-white rounded hover:bg-green-700">
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditProduct;
