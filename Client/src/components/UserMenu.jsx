import React from "react";
import { useSelector } from "react-redux";
import Divider from "./Divider";
import { Link } from "react-router-dom";

const UserMenu = () => {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <div className="font-semibold">
        <h3>My Account</h3>
        <h3 className="flex justify-between">
          Name : <strong>{user?.name || user?.mobile}</strong>{" "}
        </h3>
      </div>
      <Divider />

      <div className="mt-2">
        <ul className="list-style-none py-2">
          <Link to={"/"}>
            <li className="p-1 rounded hover:bg-gray-400">My Order</li>
          </Link>
          <Link to={"/"}>
            <li className="p-1 rounded hover:bg-gray-400">Save Order</li>
          </Link>
        </ul>

        <button className="p-2 rounded bg-orange-500">Log Out</button>
      </div>
    </div>
  );
};

export default UserMenu;
