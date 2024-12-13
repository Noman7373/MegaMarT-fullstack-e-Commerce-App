import React, { useState } from "react";
import UploadSubcategory from "./UploadSubcategory";

const SubCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
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

      {isOpen && <UploadSubcategory close={() => setIsOpen(false)} />}

      <div>
        <div className="flex"></div>
        <div></div>
      </div>
    </section>
  );
};

export default SubCategory;
