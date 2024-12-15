import { useDispatch, useSelector } from "react-redux";
import Divider from "./Divider";
import { NavLink, useNavigate } from "react-router-dom";
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
          <span className="text-[0.8rem] text-red-600">{user?.role}</span>
          <FiExternalLink
            size={22}
            className="cursor-pointer hover:text-gray-400"
            onClick={handleDashboardNavigation}
          />{" "}
        </h3>
      </div>
      <Divider />

      <div className="mt-2">
        {user?.role === "ADMIN" ? (
          <ul className="list-style-none py-2 flex flex-col gap-2">
            <NavLink
              to={"/dashboard/admin-product"}
              className={({ isActive }) =>
                isActive
                  ? "bg-[#FFF7F0] p-2 outline outline-1 outline-[#FB8114]  outline-l-1"
                  : "p-2 hover:bg-[#F2F2F2]"
              }
              onClick={toogleMenu}
            >
              Product
            </NavLink>
            <NavLink
              to={"/dashboard/product-category"}
              className={({ isActive }) =>
                isActive
                  ? "bg-[#FFF7F0] p-2 outline outline-1 outline-[#FB8114]  outline-l-1"
                  : "p-2 hover:bg-[#F2F2F2]"
              }
              onClick={toogleMenu}
            >
              Category
            </NavLink>
            <NavLink
              to={"/dashboard/product-Subcategory"}
              className={({ isActive }) =>
                isActive
                  ? "bg-[#FFF7F0] p-2 outline outline-1 outline-[#FB8114]  outline-l-1"
                  : "p-2 hover:bg-[#F2F2F2]"
              }
              onClick={toogleMenu}
            >
              Subcategory
            </NavLink>
            <NavLink
              to={"/dashboard/upload-product"}
              className={({ isActive }) =>
                isActive
                  ? "bg-[#FFF7F0] p-2 outline outline-1 outline-[#FB8114]  outline-l-1"
                  : "p-2 hover:bg-[#F2F2F2]"
              }
              onClick={toogleMenu}
            >
              Add Product
            </NavLink>
            <NavLink
              to={"/dashboard/save-order"}
              className={({ isActive }) =>
                isActive
                  ? "bg-[#FFF7F0] p-2 outline outline-1 outline-[#FB8114]  outline-l-1"
                  : "p-2 hover:bg-[#F2F2F2]"
              }
              onClick={toogleMenu}
            >
              Saved Order
            </NavLink>
          </ul>
        ) : (
          <ul className="list-style-none py-2 flex flex-col gap-2">
            <NavLink
              to={"/dashboard/your-order"}
              className={({ isActive }) =>
                isActive
                  ? "bg-[#FFF7F0] p-2 outline outline-1 outline-[#FB8114]  outline-l-1"
                  : "p-2 hover:bg-[#F2F2F2]"
              }
              onClick={toogleMenu}
            >
              Your Order
            </NavLink>
            <NavLink
              to={"/dashboard/save-order"}
              className={({ isActive }) =>
                isActive
                  ? "bg-[#FFF7F0] p-2 outline outline-1 outline-[#FB8114]  outline-l-1"
                  : "p-2 hover:bg-[#F2F2F2]"
              }
              onClick={toogleMenu}
            >
              Saved Order
            </NavLink>
          </ul>
        )}

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
