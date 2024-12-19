import React, { useEffect, useState } from "react";
import { getAllProductAxios } from "../../Api/Query/userQuery";

const DisplayAdminProduct = () => {
  const [allProduct, setAllProduct] = useState([]);
  let [page, setPage] = useState(1);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchProduct = async () => {
    setMessage("");
    setIsLoading(true);
    try {
      const response = await getAllProductAxios({
        data: page,
      });
      console.log(response);

      setIsLoading(false);
      if (response.data.succuss) {
        console.log("success");
        console.log(response);
      }
    } catch (error) {
      setMessage("An error occured" || error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <>
      <h1>Prodcut Admin</h1>
    </>
  );
};

export default DisplayAdminProduct;
