import { Response } from "@/types/response";
import client from "./client";
import { User } from "@/types/user";

export const userApi = {
  getUser: async () => {
    const response = await client.get<Response<User>>("/user/me");
    return response.data;
  },
  onboard: async (data: { currency: string }) => {
    const response = await client.put<Response<User>>("/user/onboard", data);
    return response.data;
  },
};