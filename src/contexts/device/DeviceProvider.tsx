import { useEffect, useState } from "react";
import DeviceContext from "./DeviceContext";

const DeviceProvider = ({ children }: { children: React.ReactNode }) => {
  const [device, setDevice] = useState<"mobile" | "tablet" | "desktop" | null>(
    null
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDevice("mobile");
      } else if (window.innerWidth < 1024) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <DeviceContext.Provider
      value={{
        isMobile: device === "mobile",
        isTablet: device === "tablet",
        isDesktop: device === "desktop",
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

export default DeviceProvider;
