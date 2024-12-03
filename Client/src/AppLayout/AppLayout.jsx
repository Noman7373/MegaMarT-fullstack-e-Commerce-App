import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <Header />
      <main className="min-h-[24.4rem]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;
