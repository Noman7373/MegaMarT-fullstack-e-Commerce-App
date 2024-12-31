import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet, useLocation } from "react-router-dom";
import ScrollTop from "../utils/ScrollTop.jsx";
import CartMenu from "../components/pages/CartMenu.jsx";
import { useEffect, useState } from "react";

const AppLayout = () => {
  const location = useLocation();
  const [hideViewCart, setHideViewCart] = useState(true);

  useEffect(() => {
    // Update hideViewCart state when pathname changes
    if (location.pathname === "/cart") {
      setHideViewCart(false);
    }
  }, [location.pathname]); // Dependency on location.pathname
  return (
    <>
      <ScrollTop />
      <Header />
      <main className="mt-2 lg:min-h-[70vh] sm:min-h-[58vh] xs:min-h-[61vh]">
        <Outlet />
      </main>
      {hideViewCart && <CartMenu />}
      <Footer />
    </>
  );
};

export default AppLayout;
