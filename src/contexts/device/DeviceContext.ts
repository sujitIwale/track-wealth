import { createContext, useContext } from "react";

type DeviceContextType = {
  isMobile: boolean;
  isDesktop: boolean;
};

const DeviceContext = createContext<DeviceContextType>({
  isMobile: false,
  isDesktop: false,
});

export const useDevice = () => {
  const values = useContext(DeviceContext);
  if (!values) {
    throw new Error("useDevice must be used within a DeviceProvider");
  }
  return values;
};

export default DeviceContext;