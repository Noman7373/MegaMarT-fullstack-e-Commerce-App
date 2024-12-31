import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductByCategorySubcategoryAxios } from "../../Api/Query/userQuery";
import { CiSearch } from "react-icons/ci";
import AllLoader from "../../utils/AllLoader";
import CardProduct from "./CardProduct";
import { useSelector } from "react-redux";
import validateURL from "../../utils/validateURL";
import NoData from "./NoData";

const ListProduct = () => {
  const params = useParams();
  const allCategory = useSelector((state) => state?.Products?.allCategories);
  const allSubcategories = useSelector(
    (state) => state?.Products?.allSubcategories
  );
  //   console.log(allSubcategories);

  const [product, setProduct] = useState([]);
  const [subcategoryProduct, setSubcategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ success: "", error: "" });

  const categoryId = params.category.split("-").slice(-1)[0];
  const subCategoryId = params.subCategory.split("-").slice(-1)[0];
  const filterCategory = allCategory.filter((cat) => cat._id === categoryId);

  // Fetch products by category and subcategory
  const fetchProductByCategorySubcategory = async () => {
    setLoading(true);
    try {
      const response = await getProductByCategorySubcategoryAxios({
        categoryId,
        subCategoryId,
      });
      if (response.data.success) {
        setProduct(response.data.productBySubcategory);
        setFeedback({ success: response.data.message, error: "" });
      }
    } catch (err) {
      setFeedback({ success: "", error: "Failed to fetch data" });
    } finally {
      setLoading(false);
    }
  };

  // Fetch and filter subcategories
  useEffect(() => {
    fetchProductByCategorySubcategory();

    const filteredSubcategories = allSubcategories.filter((sub) =>
      sub.category.some((c) => c === categoryId)
    );

    setSubcategoryProduct(filteredSubcategories || []);
  }, [params, allSubcategories]);

  // Clear success/error messages
  useEffect(() => {
    if (feedback.success || feedback.error) {
      const timer = setTimeout(
        () => setFeedback({ success: "", error: "" }),
        2000
      );
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  return (
    <section className="mx-auto flex">
      {/* Sidebar */}
      <div className="lg:w-60 md:w-40 sm:w-36 fixed w-[6.5rem] h-[70vh] flex flex-col border-r">
        <p className="p-2 xs:text-sm lg:text-xl font-semibold bg-white">
          Subcategory
        </p>

        <div className="overflow-y-auto custom-scrollbar lg:p-4 xs:p-2 w-full h-full flex flex-col gap-1">
          {subcategoryProduct?.length > 0 ? (
            subcategoryProduct.map((items, index) => {
              const url = `/${validateURL(filterCategory[0]?.name)}-${
                filterCategory[0]?._id
              }/${validateURL(items?.name)}-${items?._id}`;

              return (
                <div className="w-full">
                  {" "}
                  <Link
                    to={url}
                    key={index + items._id + "subcategory"}
                    className={`w-full flex justify-start items-center px-2 py-2 border hover:bg-[#b2f8c0] cursor-pointer shadow ${
                      items._id === subCategoryId
                        ? "bg-[#EBFFEF] border-l-2 border-l-[#22b13f]"
                        : "bg-white"
                    }`}
                  >
                    <img
                      src={items?.image}
                      alt={items?.name || "No Image"}
                      className="h-12 object-cover"
                    />
                    <p className="ml-2 text-sm">{items?.name || "Unnamed"}</p>
                  </Link>
                </div>
              );
            })
          ) : (
            <h1>No Data</h1>
          )}
        </div>
      </div>

      {/* Product Display */}
      <div className="flex flex-col gap-2 lg:ml-60 md:ml-[10rem] xs:ml-[6.6rem] sm:ml-[9rem] w-full">
        <div className="shadow-md flex justify-between items-center p-2 bg-white">
          <h1 className="font-semibold hidden lg:block">
            {params.category &&
              params.category
                .split("-")
                .slice(0, params.category.split("-").length - 1)
                .join(" ")
                .toUpperCase()}
          </h1>
          {feedback.error && <p className="text-red-500">{feedback.error}</p>}
          {feedback.success && (
            <p className="text-green-500">{feedback.success}</p>
          )}

          <div className="flex justify-center items-center gap-1 bg-blue-50 border rounded outline-none">
            <CiSearch size={30} />
            <input
              type="text"
              placeholder="Search Product"
              className="bg-blue-50 w-full rounded px-1 py-1 outline-none focus:border-yellow-300"
            />
          </div>
        </div>

        {/* Show Products */}
        <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-2 my-2">
          {!product[0] && !loading && <NoData />}

          {!loading &&
            product.map((items, index) => (
              <CardProduct
                categoryProduct={items}
                key={index + items._id + "productList"}
              />
            ))}
        </div>

        <div className="h-[25rem] flex justify-center items-center">
          {loading && <AllLoader />}
        </div>
      </div>
    </section>
  );
};

export default ListProduct;
