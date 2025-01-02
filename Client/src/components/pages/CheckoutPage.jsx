import { CgNotes } from "react-icons/cg";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdDeliveryDining, MdShoppingBag } from "react-icons/md";
import useHook from "../../hooks/useHook";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { useEffect, useState } from "react";
import AddAddress from "./AddAddress";
import ShowAddress from "./ShowAddress";
import { useParams } from "react-router-dom";

const CheckoutPage = () => {
  const { totalPrice, fetchAddressDetails } = useHook();
  const { id } = useParams();

  useEffect(() => {
    fetchAddressDetails(id);
  }, []);

  const [isOpenAddressBox, setIsOpenAddressBox] = useState(true);
  return (
    <section className="bg-blue-50">
      <div className="mx-auto p-4 flex lg:flex-row md:flex-row sm:flex-col xs:flex-col justify-around xs:gap-4">
        <div className="w-full px-4 flex flex-col gap-4 sm:max-w-md  mt-2">
          <div
            className="w-full rounded-md p-2 xs:border-2 flex justify-between cursor-pointer bg-[#16A34A] text-white "
            onClick={() => setIsOpenAddressBox((prev) => !prev)}
          >
            <p>Add Address</p>
            <span>
              {isOpenAddressBox ? (
                <BiSolidUpArrow size={25} />
              ) : (
                <BiSolidDownArrow size={25} />
              )}
            </span>
          </div>

          {/* Show Address Fields */}
          {isOpenAddressBox && <AddAddress toogleState={isOpenAddressBox} />}

          {/* Show Address Details */}
          <ShowAddress />
        </div>

        {/* Bill Detail section */}
        <div className="p-2 w-full max-w-md">
          <div className="bg-white rounded-xl border p-2">
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
                <span className="flex items-center lg:gap-1">
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
                  BHD {totalPrice < 150 ? totalPrice : totalPrice + 4 - 25}
                  .00
                </p>
              </div>

              <div className="flex justify-between p-2 text-white xs:flex-col sm:flex-row flex-row xs:gap-4">
                <button className="bg-[#16A34A] p-2 rounded hover:bg-green-700">
                  Online Payment
                </button>
                <button className="bg-blue-600 p-2 rounded hover:bg-blue-800">
                  Cash On Delivery
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
