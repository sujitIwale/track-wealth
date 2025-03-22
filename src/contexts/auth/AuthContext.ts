import { User } from "@/types/user";
import { createContext, useContext } from "react";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
  }

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};