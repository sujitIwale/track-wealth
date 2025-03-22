import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "../store/store";
import AuthProvider from "@/contexts/auth/AuthProvider";

interface Props {
  children: ReactNode;
}

const MainProvider = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
};

export default MainProvider;
