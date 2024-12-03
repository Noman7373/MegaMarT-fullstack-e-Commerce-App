import { Link, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import Search from "./Search";
import useMobile from "./hooks/useMobile";

function Header() {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname == "/search";

  return (
    <header className="bg-red-500 h-30 lg:h-20 shadow-md sticky top-0 px-2 flex items-center flex-col justify-center gap-1">
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

          {/* Sign Up sign in */}
          <div>
            <Register />
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
