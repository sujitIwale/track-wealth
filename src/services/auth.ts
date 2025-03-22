const authService = {
  loginWithGoogle: () => {
    window.location.href = `http://localhost:3001/auth/google`;
  },
  handleGoogleAuthCallback: (token: string) => {
    localStorage.setItem("token", token);
  },
  logout: () => {
    localStorage.removeItem("token");
  },
};

export default authService;
