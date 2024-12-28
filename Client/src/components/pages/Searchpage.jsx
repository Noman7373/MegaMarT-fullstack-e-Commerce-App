import React, { useState } from "react";
import CardLoading from "../../utils/CardLoading.jsx";
const Searchpage = () => {
  const [searchProduct, setSearchProduct] = useState([]);
  const [laoding, setLoading] = useState(true);
  return (
    <section className="bg-white">
      <div className="container mx-auto p-4">
        <p className="font-bold">Search Results: {searchProduct.length} </p>
      </div>
      {/* show loading */}

      <div className="grid grid-cols-1 xs:place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-10 py-5">
        {laoding &&
          new Array(10).fill(null).map((_, index) => {
            return <CardLoading key={"loadingSearchPage" + index} />;
          })}
      </div>
    </section>
  );
};

export default Searchpage;
