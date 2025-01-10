import { Link, useLocation, useNavigate } from "react-router-dom";
import Search from "./Search";
import useMobile from "../hooks/useMobile";
import { FaCartShopping, FaRegCircleUser } from "react-icons/fa6";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import UserMenu from "./UserMenu";
import Loader from "../components/status/Loader.jsx";
import useHook from "../hooks/useHook.jsx";
import CartPage from "../components/pages/CartPage.jsx";

function Header() {
  const { cart, cartLoading } = useSelector((state) => state.cart);

  const { totalPrice, setTotalPrice, totalQty, setTotalQty, disableScroll } =
    useHook();

  const navigate = useNavigate();
  const [isMobile] = useMobile();
  const location = useLocation();

  const [showMenu, setShowMenu] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const isSearchPage = location.pathname == "/search";
  const user = useSelector((state) => state?.user);

  const handleNavigation = () => {
    if (!user?._id) {
      return navigate("/");
    }
    navigate("/menubar");
  };

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  // calculate qty and price
  useEffect(() => {
    const cartQty = cart.reduce((acc, item) => acc + item.quantity, 0); // Add all `qty` values
    setTotalQty(cartQty);

    const calTotalPrice = cart.reduce((total, item) => {
      if (item.productId && item.productId.price) {
        return total + item.productId.price * item.quantity;
      }
      return total;
    }, 0);

    setTotalPrice(calTotalPrice);
  }, [cart]);

  // const closeCartPage = () => {
  //   setIsOpenCart(false);
  //   console.log("closeCartPage called!"); // Debug log
  // };
  return (
    <>
      <header className="h-30 lg:h-22 shadow-md sticky top-0 px-2 z-40 flex items-center flex-col justify-center bg-white">
        {/* logo */}

        {!(isSearchPage && isMobile) && (
          <div className="h-full w-full flex justify-between items-center">
            <Link to={"/"} className="flex justify-center">
              <h1 className="xs:text-[2rem] sm:text-[2.5rem] flex md:text-[2.7rem] font-bold text-yellow-400">
                Mega<p className="text-[#16A34A]">MarT</p>
              </h1>
            </Link>

            {/* Search */}
            <div className="sm:hidden xs:hidden md:hidden lg:block">
              <Search />
            </div>

            <div className="flex gap-5 items-center">
              <div className="flex justify-between gap-3">
                <button className="text-gray-700 xs:block sm:block md:block lg:hidden">
                  <FaRegCircleUser size={30} onClick={handleNavigation} />
                </button>
                {user?._id ? (
                  <div className="relative sm:hidden xs:hidden lg:block">
                    <button
                      className="flex text-center items-center justify-center hover:bg-[#F2F2F2] rounded-3xl px-2 py-2 "
                      onClick={handleShowMenu}
                    >
                      <h3 className="font-semibold text-[0.7rem]">
                        Order &<br /> Account
                      </h3>
                      {showMenu ? (
                        <span>
                          <IoMdArrowDropup size={25} />
                        </span>
                      ) : (
                        <span>
                          <IoMdArrowDropdown size={25} />
                        </span>
                      )}
                    </button>
                    {showMenu && (
                      <div className="absolute right-0 top-[3.8rem] transition-all duration-500 ease-in-out">
                        <div className="bg-white rounded p-4 min-w-60  lg:shadow-lg">
                          <UserMenu toogleMenu={handleShowMenu} />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={"/register-user"}
                    className="xs:hidden sm:hidden md:hidden lg:block p-2
                bg-green-600 rounded text-white hover:bg-green-700"
                  >
                    Register
                  </Link>
                )}
              </div>
              {/* add to cart btn  */}
              <button
                className="xs:hidden sm:hidden md:hidden lg:flex items-center gap-1 p-2 text-white font-bold border-none hover:bg-green-700 rounded bg-green-600"
                onClick={() => {
                  disableScroll();
                  setIsOpenCart(true);
                }}
              >
                {" "}
                <FaCartShopping size={28} className="animate-bounce" />{" "}
                {cartLoading && (
                  //
                  <Loader />
                )}
                {!cartLoading && cart[0] && (
                  <div className="text-[0.9rem] flex flex-col">
                    <p>{totalQty} Items</p>
                    <p>BD: {totalPrice}.00</p>
                  </div>
                )}
                {!cartLoading && !cart[0] && "My Cart"}
              </button>
            </div>
          </div>
        )}
        <div className="container w-full bg-gray-100 lg:hidden mb-2 rounded mt-2">
          <Search />
        </div>
      </header>

      {/* SHow Cart Component */}

      {isOpenCart && <CartPage cartPageClose={() => setIsOpenCart(false)} />}
    </>
  );
}

export default Header;
