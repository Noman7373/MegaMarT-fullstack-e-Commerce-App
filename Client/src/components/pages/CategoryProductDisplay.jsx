import React, { useEffect, useRef, useState } from "react";
import { getProductByCategoryAxios } from "../../Api/Query/userQuery";
import { Link } from "react-router-dom";
import CardLoading from "../../utils/CardLoading";
import CardProduct from "./CardProduct";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const CategoryProductDisplay = ({ name, id }) => {
  const containerRef = useRef();
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLeftButtonVisible, setIsLeftButtonVisible] = useState(false);

  const getCategoryProduct = async () => {
    setLoading(true);
    try {
      const response = await getProductByCategoryAxios({ id });
      console.log(response);
      setLoading(false);
      if (response.data.success) {
        const { categoryProduct } = response.data;
        setCategoryProduct(categoryProduct);
        console.log("sucess");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategoryProduct();
  }, []);

  // check Scroll Position

  const checkScrollPosition = () => {
    const scrollLeft = containerRef.current.scrollLeft;
    setIsLeftButtonVisible(scrollLeft > 0);
  };

  // for scroll-Right
  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("scroll", checkScrollPosition);
    // initial check
    checkScrollPosition();
    return () => container.removeEventListener("scroll", checkScrollPosition);
  }, []);

  // handle Scroll-Right
  const handleScrollRight = () => {
    containerRef.current.scrollLeft += 230; // Use scrollRight here
    checkScrollPosition();
  };

  // handle Scroll-Left
  const handleScrollLeft = () => {
    containerRef.current.scrollLeft -= 230; // Use scrollLeft here
    checkScrollPosition();
  };

  return (
    <>
      <div>
        <div className="mx-auto p-4 flex items-center justify-between">
          <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
          <Link to={""} className="text-green-600 hover:text-green-400">
            See All
          </Link>
        </div>
        <div className="relative">
          <div
            ref={containerRef}
            className="flex items-center gap-4 md:gap-6 lg:gap-8 mx-auto px-4 overflow-hidden scroll-smooth"
          >
            {loading &&
              new Array(5).fill(null).map((arr, index) => {
                return <CardLoading key={index} />;
              })}

            {!loading &&
              categoryProduct.map((product, index) => {
                return (
                  <CardProduct
                    categoryProduct={product}
                    key={index + product._id + "categoryProduct"}
                  />
                );
              })}

            <button
              className={`absolute top-1/2 -translate-y-1/2 left-2 z-10 ${
                isLeftButtonVisible ? "block" : "hidden"
              } bg-white rounded-full p-2 shadow-lg hover:bg-gray-300`}
              onClick={handleScrollLeft}
            >
              <FaAngleLeft size={23} />
            </button>
            <button
              className="absolute top-1/2 -translate-y-1/2 right-2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-300"
              onClick={handleScrollRight}
            >
              <FaAngleRight size={23} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryProductDisplay;
