import banner from "../../src/assets/banner.jpg";
import bannerMobile from "../../src/assets/banner-mobile.jpg";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Home = () => {
  const allCategory = useSelector((state) => state?.Products?.allCategories);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
        {loading
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
          : allCategory.map((category, index) => {
              return (
                <div
                  key={index || category._id}
                  className="cursor-pointer w-full h-full"
                >
                  <div>
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
    </section>
  );
};

export default Home;
