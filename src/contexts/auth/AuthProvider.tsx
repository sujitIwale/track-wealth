import { useEffect } from "react";
import { useState } from "react";
import { userApi } from "@/api/user";
import AuthContext from "./AuthContext";
import authService from "@/services/auth";
import { setUser } from "@/store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { authApi } from "@/api/auth";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        if (!localStorage.getItem("token")) {
          setLoading(false);
          return;
        }
        const response = await userApi.getUser();
        dispatch(setUser(response.data));
        setIsAuthenticated(true);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");

    if (token) {
      console.log("setting token auth provider", token);
      authService.handleGoogleAuthCallback(token);
    }

    fetchUser();
  }, [dispatch]);

  const logout = async () => {
    await authApi.logout().finally(() => {
      authService.logout();
      dispatch(setUser(null));
      setIsAuthenticated(false);
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
