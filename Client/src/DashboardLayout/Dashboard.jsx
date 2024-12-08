import React from "react";
import UserMenu from "../components/UserMenu";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto p-1 grid lg:grid-cols-[200px,1fr]">
        {/* Section for SideBar Menu */}

        <div className="py-4 sticky top-24 overflow-y-auto hidden lg:block">
          <UserMenu />
        </div>

        {/* Section for User Profile */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
