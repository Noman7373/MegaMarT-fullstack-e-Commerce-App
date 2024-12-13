import React, { useEffect, useState } from "react";
import UploadSubcategory from "./UploadSubcategory";
import { getSubCategoryAxios } from "../../Api/Query/userQuery";
import Loader from "../status/Loader";
import NoData from "./NoData";

const SubCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [subcategories, setSubcategories] = useState([]);

  const fetchSubCategories = async () => {
    setIsloading(true);

    const response = await getSubCategoryAxios();

    setIsloading(false);
    if (response.data.success) {
      const { savedSubCategory } = response.data;
      setSubcategories(savedSubCategory);
    }
    try {
    } catch (error) {
      throw new Error("An error occured try again", error);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, []);

  return (
    <section>
      <div className="flex justify-between items-center p-2 bg-white shadow-md ">
        <h1 className="font-semibold">Subcategory</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 p-2 text-white rounded hover:bg-green-700"
        >
          Add Subcategory
        </button>
      </div>

      {isOpen && (
        <UploadSubcategory
          close={() => setIsOpen(false)}
          fetchSubCategories={fetchSubCategories}
        />
      )}

      {isLoading && <Loader />}
    </section>
  );
};

export default SubCategory;
