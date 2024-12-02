import { Link } from "react-router-dom";
import Register from "./pages/Register";
import Search from "./Search";

function Navbar() {
  return (
    <header className="h-20 shadow-md sticky px-3">
      {/* logo */}
      <div className="h-full flex justify-between items-center">
        <Link to={"/"} className="h-full flex justify-center">
          <h1 className="flex text-[3rem] font-bold text-yellow-400">
            Shop<p className="text-green-700">HuB</p>
          </h1>
        </Link>

        {/* Search */}
        <div>
          <Search />
        </div>

        {/* Sign Up sign in */}
        <div>
          <Register />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
