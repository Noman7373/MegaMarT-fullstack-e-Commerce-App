import React, { useEffect, useState } from "react";
import UploadSubcategory from "./UploadSubcategory";
import Loader from "../status/Loader";
import NoData from "./NoData";
import { Link } from "react-router-dom";
import useHook from "../../hooks/useHook";
import DeleteConfirmation from "../../utils/DeleteConfirmation";
import { deleteSubcategoryAxios } from "../../Api/Query/userQuery";
import AllLoader from "../../utils/AllLoader";

const SubCategory = () => {
  const { isLoading, subcategories, fetchSubCategories } = useHook();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState("");

  const handleDelete = () => {
    setIsDeletePopupOpen(true);
  };

  // delete subcategory
  const confirmDelete = async () => {
    try {
      const response = await deleteSubcategoryAxios({ _id: deleteCategory });
      if (response.data.error) {
        return console.log("Error show");
      }
      if (response.data.success) {
        fetchSubCategories();
        setIsDeletePopupOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // fetchSubcategory
  useEffect(() => {
    fetchSubCategories();
  }, []);

  return (
    <section className="">
      <div className="flex justify-between items-center xs:w-full p-2 bg-white shadow-md ">
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

      {isLoading && <AllLoader />}

      {subcategories.length < 1 && !isLoading && <NoData />}

      {subcategories.length > 0 && !isLoading && (
        <div className="overflow-y-auto h-[20rem] mt-2 py-5 custom-scrollbar sm:w-full lg:w-full xs:px-1">
          <table className="bg-white border border-gray-200 shadow-md rounded-lg xs:w-full lg:w-full md:w-full sm:w-full ">
            <thead>
              <tr className="bg-black text-white border-b">
                <th className="text-left text-sm font-semibold uppercase border-r border-gray-200">
                  Sr.No
                </th>
                <th className="text-left text-sm font-semibold uppercase border-r border-gray-200">
                  Name
                </th>
                <th className="xs:bg-black text-center text-sm font-semibold uppercase border-r border-gray-200">
                  Images
                </th>
                <th className="text-left text-sm font-semibold uppercase border-r border-gray-200">
                  Categories
                </th>
                <th className="text-left text-sm font-semibold uppercase">
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
                  <td className="text-sm text-gray-800 border-r border-gray-200 py-2">
                    {index + 1}
                  </td>
                  <td className="text-gray-800 border-r border-gray-200  py-2">
                    {item.name}
                  </td>
                  <td className="flex items-center justify-center text-center text-sm text-gray-800 border-r border-gray-200 py-2">
                    <img
                      className=" h-10 object-cover"
                      src={item.image}
                      alt={item.name}
                    />
                  </td>
                  <td className="text-sm text-gray-800 border-r border-gray-200 py-2">
                    {item.name}
                  </td>
                  <td className="text-sm flex items-center text-center gap-2 py-2">
                    <Link
                      to={`/dashboard/updata-subcategory/${item._id}`}
                      state={{
                        name: item.name,
                        image: item.image,
                        category: item.category,
                      }}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => {
                        setDeleteCategory(item._id);
                        handleDelete();
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* open Confirm Delete Box */}
      {isDeletePopupOpen && (
        <DeleteConfirmation
          isOpen={isDeletePopupOpen}
          onClose={() => setIsDeletePopupOpen(false)}
          onConfirm={confirmDelete}
          deleteCategory={deleteCategory}
        />
      )}
    </section>
  );
};

export default SubCategory;
