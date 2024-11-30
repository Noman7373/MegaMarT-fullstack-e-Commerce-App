import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [categories, setCategories] = useState(0);

  const categoryList = ["milk", "bread", "suger", "panner"]; // The list of categories

  const searchCategoryShow = () => {
    setCategories((prev) => (prev + 1) % categoryList.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      searchCategoryShow(); // Add the next category every 2 seconds
    }, 800);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-12 rounded flex justify-between items-center border p-2 overflow-hidden bg-gray-50">
      <button className="text-gray-700">
        <FaSearch size={20} />
      </button>

      <div className="w-[90%]">
        <input
          type="text"
          className="w-full outline-none border-none p-1 bg-transparent"
          placeholder={`Search by "${categoryList[categories]}"`}
        />
      </div>
    </div>
  );
};

export default Search;
