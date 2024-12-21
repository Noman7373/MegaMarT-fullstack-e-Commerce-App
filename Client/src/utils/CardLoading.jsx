import React from "react";

const CardLoading = () => {
  return (
    <div className="border p-2 grid gap-1 max-w-52 rounded animate-pulse">
      <div className="min-h-20 bg-blue-50 rounded"></div>
      <div className="p-3 bg-blue-50 rounded w-20"></div>
      <div className="p-3 bg-blue-50 rounded"></div>
      <div className="p-3 bg-blue-50 rounded w-14"></div>
      <div className="flex items-center justify-center gap-3">
        <div className="p-3 bg-blue-50 rounded w-20">price</div>
        <button className="p-3 bg-blue-50 rounded w-20">price</button>
      </div>
    </div>
  );
};

export default CardLoading;
