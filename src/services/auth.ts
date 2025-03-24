import { API_URL } from "@/constants/api";

const authService = {
  loginWithGoogle: () => {
    window.location.href = `${API_URL}/auth/google`;
  },
  handleGoogleAuthCallback: (token: string) => {
    localStorage.setItem("token", token);
  },
  logout: () => {
    localStorage.removeItem("token");
  },
};

export default authService;
