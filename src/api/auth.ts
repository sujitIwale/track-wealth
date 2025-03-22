import client from "./client";

export const authApi = {
  googleAuth: async () => {
    const response = await client.get("/auth/google",{
      withCredentials: true
    });
    return response.data;
  },
};