import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "../store/store";
import AuthProvider from "@/contexts/auth/AuthProvider";
import DeviceProvider from "@/contexts/device/DeviceProvider";

interface Props {
  children: ReactNode;
}

const MainProvider = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <DeviceProvider>
        <AuthProvider>{children}</AuthProvider>
      </DeviceProvider>
    </Provider>
  );
};

export default MainProvider;
