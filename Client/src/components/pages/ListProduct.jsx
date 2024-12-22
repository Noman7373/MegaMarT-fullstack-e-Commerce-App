import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductByCategorySubcategoryAxios } from "../../Api/Query/userQuery";
import { CiSearch } from "react-icons/ci";
import AllLoader from "../../utils/AllLoader";
import CardProduct from "./CardProduct";


const ListProduct = () => {
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [product, setProduct] = useState([]);

  const categoryId = params.category.split("-").slice(-1)[0];
  const subCategoryId = params.subCategory.split("-").slice(-1)[0];

  // fetch ProductBy Category-Subcategory
  const fetchProductByCategorySubcategory = async () => {
    setLoading(true);
    try {
      const response = await getProductByCategorySubcategoryAxios({
        categoryId,
        subCategoryId,
      });
      setError("");
      setLoading(false);
      if (response.data.success) {
        const { productBySubcategory } = response.data;
        setProduct(productBySubcategory);
        setSuccess(response.data.message);
        setError("");
      }
    } catch (error) {
      setError("Fetch Data Field", error.message);
      setSuccess("");
    } finally {
      setError("");
      setSuccess("");
      setLoading(false);
    }
  };
  // fetch-Product
  useEffect(() => {
    fetchProductByCategorySubcategory();
  }, []);

  // Clear Msg
  useEffect(() => {
    if (success || error) {
      let timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return (
    <section className="mx-auto flex">
      {/* Sidebar */}
      <div className="lg:w-60 md:w-40 sm:w-36 fixed w-30 h-[70vh] flex flex-col border-r">
        <div className=" p-4 font-bold text-lg border-b hidden md:block sm:block lg:block">
          SUbcategory Prodcut
        </div>
        <ul className="overflow-y-auto lg:p-4 xs:p-2 w-full">
          {/* Example Items */}

          <li className="hover:bg-gray-300 p-2 rounded cursor-pointer">
            Category
          </li>
          <li className="hover:bg-gray-300 p-2 rounded cursor-pointer">
            Category
          </li>
          <li className="hover:bg-gray-300 p-2 rounded cursor-pointer">
            Category
          </li>
        </ul>
      </div>

      {/* Product Display */}

      <div className="flex flex-col gap-2 lg:ml-60 md:ml-[10rem] xs:ml-[6.7rem] sm:ml-[9rem] w-full">
        <div className="shadow-md flex justify-between items-center p-2">
          <h1 className="font-semibold hidden lg:block md:block sm:block">
            {params.category &&
              params.category
                .split("-")
                .slice(0, params.category.split("-").length - 1)
                .join(" ")
                .toUpperCase()}
          </h1>
          {error && <p className="text-red-500 hidden lg:block">{error}</p>}
          {success && (
            <p className="text-green-500 hidden lg:block">{success}</p>
          )}

          <div className="flex justify-center items-center gap-1 bg-blue-50 border rounded outline-none">
            <CiSearch size={30} />
            <input
              type="text"
              placeholder="Search Product"
              className="bg-blue-50  rounded px-1 py-1 outline-none focus:border-yellow-300"
            />
          </div>
        </div>
        {/* Show Product */}
        <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2 my-10">
          {!loading &&
            product &&
            product.map((items, index) => {
              return (
                <CardProduct
                  categoryProduct={items}
                  key={index + items._id + "productList"}
                />
              );
            })}
        </div>

        <div>{loading && <AllLoader />}</div>
      </div>
    </section>
  );
};

export default ListProduct;
