import { createContext, useContext } from "react";

type DeviceContextType = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

const DeviceContext = createContext<DeviceContextType>({
  isMobile: false,
  isTablet: false,
  isDesktop: false,
});

export const useDevice = () => {
  const { isMobile, isTablet, isDesktop } = useContext(DeviceContext);
  return { isMobile, isTablet, isDesktop };
};

export default DeviceContext;