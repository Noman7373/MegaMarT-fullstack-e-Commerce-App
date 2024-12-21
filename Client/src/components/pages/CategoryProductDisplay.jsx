import React, { useEffect, useState } from "react";
import { getProductByCategoryAxios } from "../../Api/Query/userQuery";
import { Link } from "react-router-dom";
import CardLoading from "../../utils/CardLoading";
import CardProduct from "./CardProduct";

const CategoryProductDisplay = ({ name, id }) => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      <div>
        <div className="mx-auto p-4 flex items-center justify-between">
          <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
          <Link to={""} className="text-green-600 hover:text-green-400">
            See All
          </Link>
        </div>
        <div className="flex items-center gap-4 md:gap-6 lg:gap-8 mx-auto px-4">
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
        </div>
      </div>
    </>
  );
};

export default CategoryProductDisplay;
