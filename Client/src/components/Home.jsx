import banner from "../../src/assets/banner.jpg";
import bannerMobile from "../../src/assets/banner-mobile.jpg";
import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
import validateURL from "../utils/validateURL.js";
import { useNavigate } from "react-router-dom";
import CategoryProductDisplay from "./pages/CategoryProductDisplay.jsx";
const Home = () => {
  const navigate = useNavigate();
  const allCategory = useSelector((state) => state?.Products?.allCategories);
  const allSubcategories = useSelector(
    (state) => state?.Products?.allSubcategories
  );


  const handleNavigation = (name, id) => {
    // Find the subcategory based on the category ID
    const subcategory = allSubcategories.find((sub) =>
      sub.category.some((c) => c === id)
    );
 

    // Check if subcategory exists
    if (!subcategory) {
      console.error("Subcategory not found for category ID:", id);
      return;
    }
    // Generate the URL
    const url = `/${validateURL(name)}-${id}/${validateURL(subcategory.name)}-${
      subcategory._id
    }`;
    // Navigate to the URL
    navigate(url);
  };

  return (
    <section className="bg-white py-2 ">
      <div className="mx-auto">
        <div
          className={`w-full min-h-48 bg-blue-100 ${
            !banner && "animate - pulse my-2"
          }`}
        >
          <img
            src={banner}
            alt="homePage-Banner"
            className="w-full h-full hidden md:block lg:block"
          />
          <img
            src={bannerMobile}
            alt="homePage-Banner"
            className="w-full h-full xs:block sm:block md:hidden lg:hidden"
          />
        </div>
      </div>

      <div className="mx-auto px-4 my-2 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {allCategory.map((category, index) => {
          return (
            <div
              key={index || category._id + "displayCategory"}
              className="cursor-pointer w-full h-full"
            >
              <div
                onClick={() => handleNavigation(category.name, category._id)}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-scale-down"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* {loading
          ? new Array(14).fill(null).map((cat, index) => {
              return (
                <div
                  key={index}
                  className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse"
                >
                  <div className="bg-blue-50 min-h-24 rounded"></div>
                  <div className="bg-blue-50 h-8 rounded"></div>
                </div>
              );
            })
          :
          { allCategory.map((category, index) => { 
              return (
                <div
                  key={index || category._id + "displayCategory"}
                  className="cursor-pointer w-full h-full"
                >
                  <div
                    onClick={() =>
                      handleNavigation(category.name, category._id)
                    }
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-scale-down"
                    />
                  </div>
                </div>
              );
            })}
      </div>

      {/* Display Category Product */}

      {allCategory.map((cate) => {
        return (
          <CategoryProductDisplay
            key={cate._id + "categroyProduct"}
            id={cate._id}
            name={cate.name}
          />
        );
      })}
    </section>
  );
};

export default Home;
