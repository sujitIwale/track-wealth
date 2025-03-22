import client from "./client";

export const userApi = {
  getUser: async () => {
    const response = await client.get("/user/me");
    return response.data;
  },
};