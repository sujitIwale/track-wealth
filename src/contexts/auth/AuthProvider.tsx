import { useEffect } from "react";
import { User } from "@/types/user";
import { useState } from "react";
import { userApi } from "@/api/user";
import AuthContext from "./AuthContext";
import authService from "@/services/auth";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        if (!localStorage.getItem("token")) {
          throw new Error("No token found");
        }
        const user = await userApi.getUser();
        setUser(user);
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
      authService.handleGoogleAuthCallback(token);
    }

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
