import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Divider from "./Divider";
import { Link } from "react-router-dom";
import { logOutUser } from "../Api/Query/userQuery";
import { removeUserDetails } from "../store/userSlice";

const UserMenu = ({ toogleMenu }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogOutApi = async () => {
    try {
      const response = await logOutUser();
      if (response.data.success) {
        dispatch(removeUserDetails());
        console.log(response.data);
      }
    } catch (error) {
      throw new Error("An error occured while log out try again");
    }
  };

  return (
    <>
      <div className="font-semibold">
        <h3>My Account</h3>
        <h3 className="flex justify-between">
          Name : <strong>{user?.name || user?.mobile}</strong>{" "}
        </h3>
      </div>
      <Divider />

      <div className="mt-2">
        <ul className="list-style-none py-2">
          <Link to={"/"} onClick={toogleMenu}>
            <li className="p-1 rounded hover:bg-gray-400">My Order</li>
          </Link>
          <Link to={"/login"} onClick={toogleMenu}>
            <li className="p-1 rounded hover:bg-gray-400">Save Order</li>
          </Link>
        </ul>

        <button className="p-2 rounded bg-orange-500" onClick={handleLogOutApi}>
          Log Out
        </button>
      </div>
    </>
  );
};

export default UserMenu;
