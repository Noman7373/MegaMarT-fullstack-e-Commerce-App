import React, { useEffect, useState } from "react";
import { getAllProductAxios } from "../../Api/Query/userQuery";
import AllLoader from "../../utils/AllLoader.jsx";
import ProductAdminCard from "./ProductAdminCard.jsx";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import { CiSearch } from "react-icons/ci";

const DisplayAdminProduct = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [search, setSearch] = useState("");

  const fetchProduct = async () => {
    setMessage("");
    setIsLoading(true);
    try {
      const response = await getAllProductAxios({
        page,
        limit: 12,
        search,
      });

      setIsLoading(false);
      if (response?.data?.success) {
        const { data, totalCount, totalNoPage } = response.data;
        setTotalPageCount(totalCount);
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

  // handle Next
  const handleNext = () => {
    if (page !== totalPageCount) {
      setPage((prev) => prev + 1);
    }
  };
  // handle prev
  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  //  handle Search

  useEffect(() => {
    let flag = true;
    const timer = setTimeout(() => {
      if (flag) {
        fetchProduct();
        setPage(1);
        flag = false;
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  console.log(search);

  return (
    <>
      <section>
        <div className="flex justify-between items-center p-2 bg-white shadow-md">
          <h1 className="font-semibold xs:text-[0.8rem] xs:hidden md:text-[1rem] sm:block lg:block md:block">
            Admin Product
          </h1>
          {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
          <div className="flex justify-center items-center gap-2 bg-blue-50 border rounded outline-none">
            <CiSearch size={30} />
            <input
              type="text"
              placeholder="Search Product"
              className="bg-blue-50  rounded px-1 py-1 outline-none focus:border-yellow-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="py-4 bg-blue-50">
          {/* {isLoading && <AllLoader />} */}
          <div className="min-h-[54vh]">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 py-2 overflow-auto h-[20rem] custom-scrollbar">
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
          </div>

          {/* Pagination */}
          <div className="flex justify-between px-2 mt-1">
            <button onClick={handlePrev}>
              <BsFillArrowLeftCircleFill
                size={30}
                className={`${page === 1 ? "hidden" : "hover:bg-gray-700"}`}
              />
            </button>
            <span>
              {page}/{totalPageCount}
            </span>
            <button onClick={handleNext}>
              <BsFillArrowRightCircleFill
                size={30}
                className={`${
                  page === totalPageCount ? "hidden" : "hover:bg-gray-700"
                }`}
              />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default DisplayAdminProduct;
