import React, { useEffect, useState } from "react";
import UploadSubcategory from "./UploadSubcategory";
import { getSubCategoryAxios } from "../../Api/Query/userQuery";
import Loader from "../status/Loader";
import NoData from "./NoData";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

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

      {/* {!subcategories[0] && !isLoading && <NoData />} */}

      {!isLoading && (
        <div className="overflow-y-auto">
          <table className="lg:min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr className="bg-black text-white border-b">
                <th className="w-10 px-3 py-3 text-left text-sm font-semibold uppercase border-r border-gray-200">
                  Sr.No
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase border-r border-gray-200">
                  Name
                </th>
                <th className="w-10 px-6 py-3 text-center text-sm font-semibold uppercase border-r border-gray-200">
                  Images
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase border-r border-gray-200">
                  Categories
                </th>
                <th className="w-10 px-6 py-3 text-left text-sm font-semibold uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {subcategories.map((item, index) => (
                <tr
                  key={item._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } border-b border-gray-200`}
                >
                  <td className="text-sm text-gray-800 border-r border-gray-200 px-3 py-2">
                    {index + 1}
                  </td>
                  <td className="text-gray-800 border-r border-gray-200 px-6 py-2">
                    {item.name}
                  </td>
                  <td className="flex items-center justify-center text-center text-sm text-gray-800 border-r border-gray-200 px-6 py-2">
                    <img
                      className="w-10 h-10 object-cover"
                      src={item.image}
                      alt={item.name}
                    />
                  </td>
                  <td className="text-sm text-gray-800 border-r border-gray-200 px-6 py-2">
                    {item.category}
                  </td>
                  <td className="text-sm flex items-center text-center gap-2 px-6 py-2">
                    <button className="text-blue-500 hover:underline">
                      Edit
                    </button>
                    <button className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default SubCategory;
