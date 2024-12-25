import { useParams } from "react-router-dom";
import { getProductDetailAxios } from "../../Api/Query/userQuery";
import { useEffect } from "react";

const MainProductPage = () => {
  const { id } = useParams();
  console.log(id);

  const ProductDetail = async () => {
    try {
      const response = await getProductDetailAxios(id);
      if (response.data.success) {
        console.log("success");
        console.log(response);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    ProductDetail();
  }, []);

  return (
    <div>
      <h1>MainProductPage</h1>
    </div>
  );
};

export default MainProductPage;
