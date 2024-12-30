import { useParams } from "react-router-dom";
import { getProductDetailAxios } from "../../Api/Query/userQuery";
import { useEffect, useRef, useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { convertPriceBD } from "../../utils/convertPriceInBD";
import { discountPrice } from "../../utils/priceWithDiscount";
import image1 from "../../assets/minute_delivery.png";
import image2 from "../../assets/Best_Prices_Offers.png";
import image3 from "../../assets/Wide_Assortment.png";
import Divider from "../Divider";
import AllLoader from "../../utils/AllLoader";
import AddToCartButtons from "../../utils/AddToCartButtons";

const MainProductPage = () => {
  const { id } = useParams();
  const imageContainer = useRef(null);

  const [data, setData] = useState({
    name: "",
    image: [],
    description: "",
    unit: "",
    price: 0,
    discount: 0,
    more_details: {},
  });
  const [imageIndex, setImageIndex] = useState(0);
  const [status, setStatus] = useState({
    loading: false,
    success: "",
    error: "",
  });

  const fetchProductDetail = async () => {
    setStatus({ loading: true, success: "", error: "" });
    try {
      const response = await getProductDetailAxios({ id });
      if (response.data.success) {
        const { productData } = response.data;
        setData(productData[0]);
        setStatus({
          loading: false,
          success: "Data fetched successfully!",
          error: "",
        });
      } else {
        setStatus({
          loading: false,
          success: "",
          error: "No Image Available.",
        });
      }
    } catch (error) {
      setStatus({ loading: false, success: "", error: error.message });
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  // Clear status messages after 3 seconds
  useEffect(() => {
    if (status.success || status.error) {
      const timer = setTimeout(() => {
        setStatus({ loading: false, success: "", error: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status.success, status.error]);

  // Scroll Handlers
  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100;
  };

  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100;
  };

  const handleChangeImage = (index) => {
    setImageIndex(index);
  };

  return (
    <section className="mx-auto p-4 grid lg:grid-cols-2 gap-6">
      {/* Image Section */}
      <div>
        {status.loading && (
          <div className="bg-white lg:min-h-[45vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full flex justify-center items-center">
            <AllLoader />
          </div>
        )}
        <div className="bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full">
          {!status.loading && data.image.length > 0 ? (
            <img
              src={data.image[imageIndex]}
              alt={`Product image ${imageIndex + 1}`}
              className="w-full h-full object-scale-down"
            />
          ) : (
            <p className="text-center text-gray-500">{status.error}</p>
          )}
        </div>

        {/* Image Dots */}
        <div className="flex items-center justify-center gap-3 my-2">
          {data.image.map((_, index) => (
            <div
              key={`dot-${index}`}
              className={`w-3 h-3 lg:w-5 lg:h-5 rounded-full cursor-pointer ${
                index === imageIndex ? "bg-slate-300" : "bg-slate-200"
              }`}
              onClick={() => setImageIndex(index)}
            ></div>
          ))}
        </div>

        {/* Image Scroll */}
        <div className="relative grid">
          <div
            ref={imageContainer}
            className="flex gap-4 w-full overflow-x-auto scrollbar-none"
          >
            {data.image.map((img, index) => (
              <div
                key={`thumb-${index}`}
                className="w-20 h-20 cursor-pointer shadow-md"
              >
                <img
                  src={img}
                  onClick={() => handleChangeImage(index)}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-scale-down border cursor-pointer"
                />
              </div>
            ))}
          </div>
          <div className="hidden lg:flex justify-between absolute w-full h-full items-center -ml-3">
            {imageContainer.current?.scrollLeft > 0 && (
              <button
                onClick={handleScrollLeft}
                className="p-1 bg-white rounded-full shadow-lg"
              >
                <FaAngleLeft />
              </button>
            )}
            {imageContainer.current?.scrollWidth >
              imageContainer.current?.clientWidth && (
              <button
                onClick={handleScrollRight}
                className="p-1 bg-white rounded-full shadow-lg"
              >
                <FaAngleRight />
              </button>
            )}
          </div>
        </div>

        {/* Description Section */}
        <div className="my-4 lg:grid gap-3">
          <div>
            <p className="font-semibold">Description</p>
            <p className="text-base text-slate-400">
              {data.description.slice(0, 180)}
            </p>
          </div>

          {data.more_details &&
            Object.keys(data.more_details).map((key, index) => (
              <div className="mt-3" key={`details-${index}`}>
                <p className="font-semibold">{key}</p>
                <p className="text-base text-slate-400">
                  {data.more_details[key]}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="py-3">
        <h2 className="text-lg font-semibold lg:text-3xl">{data.name}</h2>
        <div className="bg-green-100 text-green-600 rounded text-sm w-fit px-2 mt-4">
          10 MINS
        </div>
        <div className="py-4">
          <Divider />
        </div>
        <div className="flex items-start justify-start py-3">
          <p className="font-semibold py-5 px-4 border border-[#318616] rounded-xl ">
            Unit {data.unit}
          </p>
        </div>
        <div>
          {/* <p className="font-bold text-lg">Price:</p> */}
          <div className="flex items-center gap-2">
            <div className="border border-green-600 px-4 py-2 bg-green-50">
              <p className="font-semibold text-lg">
                {convertPriceBD(discountPrice(data.price, data.discount))}
              </p>
            </div>
            {data.discount > 0 && (
              <>
                <p className="line-through text-gray-500">
                  {convertPriceBD(data.price)}
                </p>
                <p className="font-bold text-green-600">{data.discount}% Off</p>
              </>
            )}
          </div>
          <div className="mt-4">
            <p className="text-slate-400 text-sm">(Inclusive of all taxes)</p>
            {Boolean(data.stock > 0) && <AddToCartButtons productData={data} />}
          </div>
        </div>
        <h2 className="font-semibold mt-4">Why shop from us?</h2>
        <div className="flex  items-center gap-4 my-4">
          <img src={image1} alt="superfast delivery" className="w-20 h-20" />
          <div className="text-sm">
            <div className="font-semibold">Superfast Delivery</div>
            <p className="text-slate-400">
              Get your orer delivered to your doorstep at the earliest from dark
              stores near you.
            </p>
          </div>
        </div>
        <div className="flex  items-center gap-4 my-4">
          <img src={image2} alt="Best prices offers" className="w-20 h-20" />
          <div className="text-sm">
            <div className="font-semibold">Best Prices & Offers</div>
            <p className="text-slate-400">
              Best price destination with offers directly from the
              nanufacturers.
            </p>
          </div>
        </div>
        <div className="flex  items-center gap-4 my-4">
          <img src={image3} alt="Wide Assortment" className="w-20 h-20" />
          <div className="text-sm">
            <div className="font-semibold">Wide Assortment</div>
            <p className="text-slate-400">
              Choose from 5000+ products across food personal care, household &
              other categories.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainProductPage;
