import { useAuth } from "@/contexts/auth/AuthContext";
import { Navigate, Outlet } from "react-router";
import Spinner from "../common/Spinner/Spinner";

const GuestRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default GuestRoute;
