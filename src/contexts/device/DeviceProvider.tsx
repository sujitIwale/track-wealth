import { useEffect, useState } from "react";
import DeviceContext from "./DeviceContext";

const DeviceProvider = ({ children }: { children: React.ReactNode }) => {
  const [device, setDevice] = useState<"mobile" | "desktop">("desktop");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDevice("mobile");
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
        isDesktop: device === "desktop",
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

export default DeviceProvider;
