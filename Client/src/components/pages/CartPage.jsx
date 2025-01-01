import { LuTimer } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useHook from "../../hooks/useHook";
import { useSelector } from "react-redux";

const CartPage = ({ closeCart }) => {
  const navigate = useNavigate();
  const { totalQty, totalPrice, enableScroll } = useHook();
  const { cart, cartLoading } = useSelector((state) => state.cart);
  // console.log(cart);
  const productData = cart.map((items) => items.productId);
  console.log(productData);

  const handleNavigate = () => {
    navigate(-1);
    enableScroll();
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 z-40  bg-neutral-800 bg-opacity-40">
      <div className="h-full bg-white max-w-sm w-full  min-h-screen max-h-screen ml-auto">
        <div className="flex justify-between p-4 shadow-md">
          <h2 className="font-bold">My Cart</h2>
          <button
            onClick={closeCart}
            className="hover:text-[#16A34A] hidden md:block lg:block"
          >
            <IoMdClose size={30} />
          </button>
          <button
            onClick={handleNavigate}
            className="hover:text-[#16A34A] lg:hidden md:hidden block"
          >
            <IoMdClose size={30} />
          </button>
        </div>

        {/* Display cart */}

        <div className=" p-2 bg-[#F0F2F7]">
          <div className="h-[30rem] p-3 overflow-y-auto custom-scrollbar flex flex-col gap-4 rounded bg-[#FFFFFF]">
            <div className="flex gap-4 items-center p-1">
              <span>
                <LuTimer size={50} />
              </span>

              <div className="grid">
                <p className="font-semibold">Delivery in 10 minutes</p>
                <p className="text-[#9e9eae]">Shipment of {totalQty} items</p>
              </div>
            </div>

            {productData.length > 0 ? (
              productData.map((cartItems, index) => (
                <div
                  key={cartItems._id || index + "cartItems"}
                  className="p-2  flex items-center justify-between gap-4"
                >
                  {/* <div className="h-full w-full"> */}
                  <div className="flex-[3] w-[30%] border rounded">
                    <img
                      src={cartItems?.image?.[0] || "default-image.jpg"} // Default image fallback
                      alt={cartItems?.name || "Product Image"}
                      className="h-[4rem] w-full object-scale-down"
                    />
                  </div>
                  {/* </div> */}

                  <div className="flex-[7] w-[70%] flex-col h-full">
                    <p className="text-[0.8rem] text-slate-700">
                      {cartItems?.name || "Product Name"}
                    </p>{" "}
                    <div className="grid grid-cols-2">
                      <p className="text-slate-500">{cartItems?.unit}</p>
                    </div>
                    {/* Ensuring 'name' is displayed */}
                    <p className="font-semibold">BD {cartItems?.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No Product</p>
            )}
          </div>
        </div>

        <div className="fixed bottom-5  max-w-sm w-full shadow-md rounded z-50 bg-white p-2">
          <div className="bg-[#16A34A] p-2 rounded text-neutral-100">
            <div className="flex items-center justify-between gap-2">
              <p> Procced To Payment</p>
              <p>BHD: {totalPrice > 0 ? `${totalPrice}.00` : "00"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
