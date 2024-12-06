import React from "react";
import loader from "../../assets/loader.gif";
const Loader = () => {
  return (
    <div className=" flex justify-center w-full bg-green-800 py-1">
      <img src={loader} className="w-8 rounded-[50%]" alt="loader/gif" />
    </div>
  );
};

export default Loader;
