import { useDispatch, useSelector } from "react-redux";
import Divider from "./Divider";
import { Link, useNavigate } from "react-router-dom";
import { logOutUser } from "../Api/Query/userQuery";
import { removeUserDetails } from "../store/userSlice";
import { FiExternalLink } from "react-icons/fi";
import useMobile from "../hooks/useMobile";

const UserMenu = ({ toogleMenu }) => {
  const [isMobile] = useMobile();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleLogOutApi = async () => {
    try {
      const response = await logOutUser();
      if (response.data.success) {
        dispatch(removeUserDetails());
        toogleMenu();
      }
    } catch (error) {
      throw new Error("An error occured while log out try again");
    }
  };

  // handle handleDashboardNavigation
  const handleDashboardNavigation = () => {
    if (!isMobile) {
      toogleMenu();
    }
    navigate(`/dashboard/profile/${user._id}`);
  };

  return (
    <>
      <div className="font-semibold px-1">
        <h3>My Account</h3>
        <h3 className="flex items-center text-ellipsis max-w-52 line-clamp-1 gap-5 mt-2">
          {user?.name || user?.mobile}{" "}
          <FiExternalLink
            size={22}
            className="cursor-pointer hover:text-gray-400"
            onClick={handleDashboardNavigation}
          />{" "}
        </h3>
      </div>
      <Divider />

      <div className="mt-2">
        <ul className="list-style-none py-2 flex flex-col gap-2">
          <Link
            to={"/dashboard/My-Order"}
            className="p-1 rounded hover:bg-gray-200"
            onClick={toogleMenu}
          >
            My Order
          </Link>
          <Link
            to={"/login"}
            className="p-1 rounded hover:bg-gray-200"
            onClick={toogleMenu}
          >
            Save Order
          </Link>
        </ul>

        <button
          className="p-1 rounded text-white bg-slate-600 ml-1 hover:bg-slate-500"
          onClick={handleLogOutApi}
        >
          Log Out
        </button>
      </div>
    </>
  );
};

export default UserMenu;
