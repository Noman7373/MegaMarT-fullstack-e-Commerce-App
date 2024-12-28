import React, { useEffect, useState } from "react";
import CardLoading from "../../utils/CardLoading.jsx";
import useHook from "../../hooks/useHook.jsx";
import { searchProductAxios } from "../../Api/Query/userQuery.js";
import CardProduct from "./CardProduct.jsx";
import { useSelector } from "react-redux";
const Searchpage = () => {
  const user = useSelector((state) => state.user);
  // form contextApi
  const { search } = useHook();
  const [searchProduct, setSearchProduct] = useState([]);

  const [status, setStatus] = useState({
    loading: false,
    success: "",
    error: "",
  });

  // SearchProduct
  const findProduct = async () => {
    setStatus({ loading: true, success: "", error: "" });
    try {
      const response = await searchProductAxios({
        search,
      });

      if (response.data.success) {
        const { productsToShow } = response?.data;
        setSearchProduct(search === "" ? [] : productsToShow);

        setStatus({
          loading: false,
          success: response.data.message,
          error: "",
        });
      }
    } catch (error) {
      console.log("err", error.message);
      setStatus({
        loading: false,
        success: "",
        error: "An Error Occured" || error.message,
      });
    }
  };

  // Call findProduct Fountion
  useEffect(() => {
    findProduct();
  }, [search]);

  //  Clear status Msg
  useEffect(() => {
    if (status.success || status.success) {
      const timer = setTimeout(() => {
        setStatus({ success: "", error: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status.success, status.error]);

  return (
    <section className="bg-white min-h-[25rem]">
      <div className=" p-4 bg-white flex justify-between items-center">
        <p className="font-bold">Search Results: {searchProduct.length}</p>

        {/* Show success/error messages */}
        {Boolean(user.role === "ADMIN") &&
          status.error && (
            <div className="text-center text-red-500">{status.error}</div>
          ) &&
          status.success(
            <div className="text-center text-green-500">{status.success}</div>
          )}
      </div>

      {/* show loading */}
      {status.loading && (
        <div className="grid grid-cols-1 xs:place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-2">
          {Array.from({ length: 10 }, (_, index) => (
            <CardLoading key={`loadingSearchPage-${index}`} />
          ))}
        </div>
      )}

      {/* Show searchProduct */}
      {searchProduct[0] && !status.loading && (
        <div className="grid grid-cols-1 xs:place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-2 py-3">
          {searchProduct.length > 0
            ? searchProduct.map((product, index) => (
                <CardProduct
                  categoryProduct={product}
                  key={index + product._id + "searchProductList"}
                />
              ))
            : search === ""
            ? ""
            : ""}
        </div>
      )}

      {/* No Result */}
      {!searchProduct[0] && !status.loading && (
        <div className="w-full flex items-center justify-center">
          <p className="text-center w-full text-gray-500">No results found.</p>
        </div>
      )}
    </section>
  );
};

export default Searchpage;
