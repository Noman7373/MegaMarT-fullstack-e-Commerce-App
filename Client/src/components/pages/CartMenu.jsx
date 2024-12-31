import React from "react";
import useHook from "../../hooks/useHook";
import { FaCartArrowDown } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";

const CartMenu = () => {
  const { totalQty, totalPrice } = useHook();
  return (
    <>
      {totalQty && (
        <div className="sticky bottom-5  p-2 lg:hidden z-40">
          <Link to={"/cart"}>
            <div className="bg-[#16A34A] p-2 rounded text-neutral-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>
                    {" "}
                    <FaCartArrowDown size={28} />{" "}
                  </span>

                  <div className="text-[0.9rem] flex gap-2">
                    <p>{totalQty > 0 ? totalQty : "0"} items</p>
                    <p>BHD: {totalPrice > 0 ? `${totalPrice}.00` : "00"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <p className="font-semibold">View Cart</p>
                  <FiExternalLink size={28} />
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default CartMenu;
