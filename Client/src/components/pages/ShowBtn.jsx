import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ShowBtn = () => {
  return (
    <div className="flex justify-between gap-3">
      <button className="text-gray-700 xs:block sm:block md:block lg:hidden">
        <FaRegCircleUser size={30} />
      </button>

      <button className="xs:hidden sm:hidden md:hidden lg:block p-2 bg-green-800 rounded text-white hover:bg-green-700">
        <Link to={"/register-user"}>Register</Link>
      </button>
    </div>
  );
};

export default ShowBtn;
