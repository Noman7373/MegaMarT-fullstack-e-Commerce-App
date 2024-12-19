import React, { useEffect, useState } from "react";
import { getAllProductAxios } from "../../Api/Query/userQuery";
import AllLoader from "../../utils/AllLoader.jsx";
import ProductAdminCard from "./ProductAdminCard.jsx";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

const DisplayAdminProduct = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(1);

  const fetchProduct = async () => {
    setMessage("");
    setIsLoading(true);
    try {
      const response = await getAllProductAxios({
        page,
        limit: 12,
      });

      console.log(response.data);

      setIsLoading(false);
      if (response?.data?.success) {
        const { data, totalCount, totalNoPage } = response.data;
        setTotalPageCount(totalNoPage);
        setAllProduct(data);
      }
    } catch (error) {
      setMessage(error?.message || "An error occurred");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [page]);

  // handle Pagination
  const handlePagination = () => {
    if (page !== totalPageCount) {
      setPage((prev) => prev + 1);
    }
  };
  return (
    <>
      <section>
        <div className="flex justify-between items-center p-2 bg-white shadow-md ">
          <h1 className="font-semibold">Admin Product</h1>
          <button className="bg-green-600 p-2 text-white rounded hover:bg-green-700">
            Add Category
          </button>
          {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
        </div>

        {isLoading && <AllLoader />}

        <div className="py-4 bg-blue-50">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {allProduct.map((products, index) => {
              return (
                <ProductAdminCard
                  key={products.id || index}
                  showProducts={products}
                  index={index}
                />
              );
            })}
          </div>

          <div className="flex justify-between px-2 mt-1">
            <button>
              <BsFillArrowLeftCircleFill
                size={30}
                className="hover:text-gray-500"
              />
            </button>
            <span>
              {page}/{totalPageCount}
            </span>
            <button onClick={handlePagination}>
              <BsFillArrowRightCircleFill
                size={30}
                className="hover:text-gray-500"
              />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default DisplayAdminProduct;
