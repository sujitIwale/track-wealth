import authService from "@/services/auth";
import { Navigate } from "react-router";

const Success = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");
  if (token) {
    authService.handleGoogleAuthCallback(token);
  }

  return <Navigate to="/dashboard" />;
};

export default Success;
