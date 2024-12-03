import { useEffect, useState } from "react";

const useMobile = (breakPoint = 768) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakPoint); // to know the window current width use window.innerWidth

  const handleWindowSize = () => {
    const checkPointValue = window.innerWidth < breakPoint;
    setIsMobile(checkPointValue);
  };

  useEffect(() => {
    handleWindowSize();
    window.addEventListener("resize", handleWindowSize);
    return () => {
      window.removeEventListener("resize", handleWindowSize);
    };
  }, []);

  return [isMobile];
};

export default useMobile;
