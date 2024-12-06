import { Link, useLocation } from "react-router-dom";
import Search from "./Search";
import useMobile from "../hooks/useMobile";
import { FaCartShopping, FaRegCircleUser } from "react-icons/fa6";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useSelector } from "react-redux";
import { useState } from "react";
import UserMenu from "./UserMenu";

function Header() {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname == "/search";
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((state) => state?.user);

  // const dropDownIcons = useMemo(() => {
  //   return showMenu ? (
  //     <IoMdArrowDropup size={25} />
  //   ) : (
  //     <IoMdArrowDropdown size={25} />
  //   );
  // }, [showMenu]);

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <header className="h-30 lg:h-20 shadow-md sticky top-0 px-2 flex items-center flex-col justify-center bg-white">
      {/* logo */}

      {!(isSearchPage && isMobile) && (
        <div className="h-full w-full flex justify-between items-center">
          <Link to={"/"} className="flex justify-center">
            <h1 className="xs:text-[2.2rem] sm:text-[3rem] flex md:text-[3rem] font-bold text-yellow-400">
              Shop<p className="text-green-700">HuB</p>
            </h1>
          </Link>

          {/* Search */}
          <div className="sm:hidden xs:hidden md:hidden lg:block">
            <Search />
          </div>

          <div className="flex gap-5 items-center">
            <div className="flex justify-between gap-3">
              <button className="text-gray-700 xs:block sm:block md:block lg:hidden">
                <FaRegCircleUser size={30} />
              </button>
              {user?._id ? (
                <div className="relative sm:hidden xs:hidden lg:block">
                  <button className="flex" onClick={handleShowMenu}>
                    My Account{" "}
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
                    <div className="absolute right-0 top-14 transition-all duration-500 ease-in-out">
                      <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg">
                        <UserMenu toogleMenu={handleShowMenu} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button className="xs:hidden sm:hidden md:hidden lg:block p-2 bg-green-800 rounded text-white hover:bg-green-700">
                  <Link to={"/register-user"}>Register</Link>
                </button>
              )}
            </div>
            {/* add to cart btn  */}
            <button className="xs:hidden sm:hidden md:hidden lg:flex items-center gap-2 p-2 text-white font-bold border-none hover:bg-green-700 rounded bg-green-800">
              {" "}
              <FaCartShopping size={28} className="animate-bounce" /> My Cart
            </button>
          </div>
        </div>
      )}
      <div className="container w-full bg-gray-100 lg:hidden mb-2 rounded mt-2">
        <Search />
      </div>
    </header>
  );
}

export default Header;
