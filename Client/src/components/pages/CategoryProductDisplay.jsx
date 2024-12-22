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
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Fetch Product Data
  const getCategoryProduct = async () => {
    setLoading(true);
    try {
      const response = await getProductByCategoryAxios({ id });
      setLoading(false);
      if (response.data.success) {
        const { categoryProduct } = response.data;
        setCategoryProduct(categoryProduct);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  // Fetch Product Data
  useEffect(() => {
    getCategoryProduct();
  }, []);

  // check Scroll Position
  const checkScrollPosition = () => {
    const scrollLeft = containerRef.current.scrollLeft;
    setIsLeftButtonVisible(scrollLeft > 0);
  };

  // for Checking scroll
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

  // Drag scroll Handler
  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartX(event.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;

    event.preventDefault(); // Prevent text selection
    const x = event.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scrolling speed
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  // handle MouseUp or Leave
  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
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
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className={`${
              isDragging
                ? "flex items-center gap-4 md:gap-6 lg:gap-8 mx-auto px-4 overflow-hidden scroll-smooth cursor-grabbing"
                : "flex items-center gap-4 md:gap-6 lg:gap-8 mx-auto px-4 overflow-hidden scroll-smooth"
            }`}
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
