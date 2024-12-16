import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const Products = () => {
  return (
    <>
      <section>
        <div className="flex p-2 bg-white shadow-md flex-col">
          <h1 className="font-semibold">Add Products</h1>
        </div>

        <div className="p-2 overflow-y-auto h-[54vh] py-5">
          <form className="space-y-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Product Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Product Name"
                autoFocus
                autoComplete="name"
                className="bg-blue-50 border rounded px-2 py-1 outline-none focus:border-yellow-300"
              />
            </div>
            <div className="flex flex-col gap-1 mt-4">
              <label htmlFor="description">Description</label>
              <textarea
                className="bg-blue-50 border w-full rounded px-2 py-1 outline-none focus:border-yellow-300"
                name="description"
                id="description"
                placeholder="Description....."
                rows={3}
              ></textarea>
            </div>

            {/* Image Upload */}

            <div className="mt-3 flex flex-col">
              <p>Image</p>
              <div className="bg-[#EFF6FF] rounded">
                <label
                  htmlFor="image"
                  className="p-2 flex justify-center items-center cursor-pointer"
                >
                  <FaCloudUploadAlt size={35} />
                </label>

                <input type="file" id="image" className="hidden" />
              </div>

              <div>
                <h2>Images</h2>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Products;
