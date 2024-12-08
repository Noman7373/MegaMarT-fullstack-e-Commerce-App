import React from "react";
import UserMenu from "./UserMenu";

const MobileMenu = () => {
  return (
    <div className="lg:hidden sm:block bg-white p-2 rounded">
      <UserMenu />
    </div>
  );
};

export default MobileMenu;
