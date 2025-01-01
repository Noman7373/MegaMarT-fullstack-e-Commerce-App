import { LuTimer } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useHook from "../../hooks/useHook";
import { useSelector } from "react-redux";
import AddToCartButtons from "../../utils/AddToCartButtons";
import { CgNotes } from "react-icons/cg";
import { MdDeliveryDining } from "react-icons/md";
import { MdShoppingBag } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";

const CartPage = ({ closeCart }) => {
  const navigate = useNavigate();
  const { totalQty, totalPrice, enableScroll } = useHook();
  const { cart, cartLoading } = useSelector((state) => state.cart);

  // Handle Navigation
  const handleNavigate = () => {
    navigate(-1);
    enableScroll();
  };

  // Calculate product price
  const calculateItemPrice = (quantity, price) => quantity * price;

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 z-40 bg-neutral-800 bg-opacity-40">
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
        <div className="h-[75vh] overflow-y-auto custom-scrollbar">
          {/* Display cart items */}
          {!cartLoading ? (
            <>
              <div className="p-2 bg-[#F0F2F7]">
                <div className="p-3  bg-white flex flex-col gap-4 rounded">
                  <div className="flex gap-4 items-center p-1 bg-white rounded">
                    <span>
                      <LuTimer size={50} />
                    </span>
                    <div className="grid">
                      <p className="font-semibold">Delivery in 10 minutes</p>
                      <p className="text-[#9e9eae]">
                        Shipment of {totalQty} items
                      </p>
                    </div>
                  </div>

                  {cart.length > 0 ? (
                    cart.map((item, index) => (
                      <div
                        key={item.productId?._id || index + "cart-Items"}
                        className="p-2 flex items-center justify-between gap-4"
                      >
                        <div className="flex-[3] w-[30%] border rounded">
                          <img
                            src={
                              item.productId?.image?.[0] || "default-image.jpg"
                            }
                            alt={item.productId?.name || "Product Image"}
                            className="h-[4rem] w-full object-scale-down"
                          />
                        </div>

                        <div className="flex-[7] w-[70%] flex flex-col">
                          <p className="text-[0.8rem] text-slate-700">
                            {item.productId?.name || "Product Name"}
                          </p>
                          <div className="flex justify-between items-center">
                            <p className="text-slate-500">
                              {item.productId?.unit}
                            </p>
                            {item.productId?.stock > 0 ? (
                              <AddToCartButtons productData={item.productId} />
                            ) : (
                              <p className="text-red-500 bg-[#F7FFF9] rounded px-2">
                                Out of stock
                              </p>
                            )}
                          </div>
                          <p className="font-semibold">
                            BD{" "}
                            {calculateItemPrice(
                              item.quantity,
                              item.productId?.price
                            )}
                            :00
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No Product</p>
                  )}
                </div>
              </div>
              {/* Bill Detail section */}
              <div className="p-2 bg-[#F0F2F7]">
                <div className="bg-white rounded border p-2">
                  <h2 className="font-semibold ml-2">Bill Details</h2>
                  <div className="flex flex-col gap-2 mt-1">
                    {/* Box 1 */}

                    <div className="flex justify-between ml-2">
                      <div className="flex gap-2 items-center ">
                        <CgNotes />
                        <p className="text-[0.8rem]">
                          Items Total{" "}
                          {totalPrice > 150 ? (
                            <span className="text-white bg-blue-300 rounded px-1 text-[0.6rem]">
                              saved 25 BD
                            </span>
                          ) : (
                            ""
                          )}
                        </p>
                      </div>

                      {/* Items-total */}

                      <p className="text-slate-700 text-[0.9rem]">
                        BD {totalPrice}.00
                      </p>
                    </div>
                    {/* Box 2 */}
                    <div className="flex justify-between ml-2">
                      <div className="flex gap-2 items-center ">
                        <MdDeliveryDining />
                        <p className="text-[0.8rem]">Delivery charge</p>
                        <span>
                          <IoIosInformationCircleOutline />
                        </span>
                      </div>

                      {/* Delivery total */}
                      <span className="flex items-center gap-1">
                        <p
                          className={`${
                            totalPrice > 150
                              ? "text-slate-700 line-through text-[0.9rem]"
                              : "text-slate-700 text-[0.9rem]"
                          }`}
                        >
                          BD 25.00
                        </p>
                        {totalPrice > 150 ? (
                          <p className="text-[1rem] text-blue-700">FREE</p>
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                    {/* Box 3 */}
                    <div className="flex justify-between ml-2">
                      <div className="flex gap-2 items-center ">
                        <MdShoppingBag />

                        <p className="text-[0.8rem]">Handling charge</p>
                        <span>
                          <IoIosInformationCircleOutline />
                        </span>
                      </div>

                      {/* Handling-total */}
                      <p className="text-slate-700 text-[0.9rem]">BD 4.00</p>
                    </div>

                    <div className="flex justify-between ml-3">
                      <p className="font-bold">Grand Total</p>
                      <p className="font-bold">
                        {" "}
                        BHD{" "}
                        {totalPrice < 150 ? totalPrice : totalPrice + 4 - 25}.00
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Return Policy section */}
              <div className="p-2 bg-[#F0F2F7]">
                <div className="bg-white rounded border p-2">
                  <h2 className="font-semibold ml-2">Cancellation Policy</h2>
                  <p className="text-slate-400 text-[0.8rem] ml-2">
                    Orders cannot be cancelled once packed for delivery. In case
                    of unexpected delays, a refund will be provided, if
                    applicable.
                  </p>
                </div>
              </div>
              <div className="fixed bottom-2 max-w-sm w-full shadow-md rounded z-50 p-2">
                <div className="bg-[#16A34A] p-2 rounded text-neutral-100">
                  <div className="flex items-center justify-between">
                    <p>Proceed to Payment</p>
                    <p>BHD: {totalPrice > 0 ? `${totalPrice}.00` : "00"}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CartPage;
