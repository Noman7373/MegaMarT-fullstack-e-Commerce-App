import React from "react";
import loader from "../../assets/loader.gif";
const Loader = () => {
  return (
    <div className="w-8 rounded-[50%] bg-[rgba(0,0,0,0.5)]">
      <img src={loader} className="w-full rounded-[50%]" alt="loader/gif" />
    </div>
  );
};

export default Loader;
