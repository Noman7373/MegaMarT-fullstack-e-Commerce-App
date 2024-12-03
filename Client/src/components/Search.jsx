import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import useMobile from "../hooks/useMobile";

const Search = () => {
  const location = useLocation();
  const inputRef = useRef(null);
  const [isMobile] = useMobile();

  const [categories, setCategories] = useState(0);
  const [isSearchPage, setIsSearchPage] = useState(false);

  const categoryList = ["milk", "bread", "suger", "panner"];

  const searchCategoryShow = () => {
    setCategories((prev) => (prev + 1) % categoryList.length);
  };

  // for search input
  useEffect(() => {
    if (isSearchPage && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchPage]);

  useEffect(() => {
    setIsSearchPage(location.pathname === "/search");
  }, [location.pathname]);

  useEffect(() => {
    const interval = setInterval(() => {
      searchCategoryShow();
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Link to="/search">
        <div className="w-full min-w-[300px] lg:min-w-[420px] bg-white h-11 rounded flex justify-between items-center border p-2 overflow-hidden">
          {/* condition buttons */}
          {isMobile && isSearchPage ? (
            <button
              className={`${
                isSearchPage
                  ? "text-red-400 p-1 rounded-[50%] shadow-md"
                  : "text-gray-700"
              }`}
            >
              <Link to={"/"}>
                <FaArrowLeft size={20} />
              </Link>
            </button>
          ) : (
            <button
              className={`${isSearchPage ? "text-red-400" : "text-gray-700"}`}
            >
              <Link to={"/search"}>
                <FaSearch size={23} />
              </Link>
            </button>
          )}

          <div className="w-[90%]">
            {isSearchPage ? (
              <input
                ref={inputRef}
                type="text"
                className="w-full outline-none border-none p-1 bg-transparent"
                placeholder={`Search by "${categoryList[categories]}"`}
              />
            ) : (
              <div className="w-full outline-none border-none p-1 bg-transparent">
                <p>{`Search by ${categoryList[categories]}`}</p>
              </div>
            )}
          </div>
        </div>
      </Link>
    </>
  );
};

export default Search;
