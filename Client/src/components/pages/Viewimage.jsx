import React from "react";

const Viewimage = ({ imageSrc, altText, closeModel }) => {
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 p-4 flex justify-center items-center z-40 bg-neutral-800 bg-opacity-40">
      <div className="relative">
        {/* Close Button */}
        <button
          className="absolute top-0 right-0 m-2 text-3xl font-bold cursor-pointer"
          aria-label="Close Modal"
          onClick={closeModel}
        >
          ✕
        </button>
        {/* Enlarged Image */}
        <img
          src={imageSrc}
          alt={altText}
          className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default Viewimage;
