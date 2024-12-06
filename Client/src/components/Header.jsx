import { Link, useLocation } from "react-router-dom";
import Search from "./Search";
import useMobile from "../hooks/useMobile";
import { FaCartShopping } from "react-icons/fa6";
import ShowBtn from "./pages/ShowBtn";
import { useSelector } from "react-redux";

function Header() {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname == "/search";

  const user = useSelector((state) => state?.user);
  console.log("user", user);

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
            {/* Sign Up sign in */}
            <ShowBtn />
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
