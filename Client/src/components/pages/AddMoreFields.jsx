import React from "react";

const AddMoreFields = ({ value, onChange, onSubmit, closePage }) => {
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 flex justify-center z-40 items-center bg-neutral-800 bg-opacity-40">
      <div className="bg-white max-w-xl w-full p-6 rounded-md shadow-lg relative">
        <div className="flex justify-end items-end mb-4">
          {/* <h1 className="font-semibold text-lg">Update Category</h1> */}
          <button
            onClick={closePage}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close Modal"
          >
            ✕
          </button>
        </div>
        <label htmlFor="name" className="font-semibold">
          Add Fields
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Enter Field Name"
          value={value}
          onChange={onChange}
          className="border border-gray-300 rounded-md p-2 focus:ring focus:ring-indigo-200 outline-none w-full"
        />

        <button
          className="p-2 rounded mt-3 text-white bg-blue-500 mx-auto w-fit block hover:bg-blue-600"
          onClick={onSubmit}
        >
          Add Field
        </button>
      </div>
    </section>
  );
};

export default AddMoreFields;
