import { Response } from "@/types/response";
import client from "./client";
import { User } from "@/types/user";
import { Currency } from "@/constants/misc";

export const userApi = {
  getUser: async () => {
    const response = await client.get<Response<User>>("/user/me");
    return response.data;
  },
  onboard: async (data: { currency: string }) => {
    const response = await client.put<Response<User>>("/user/onboard", data);
    return response.data;
  },
  updateCurrency: async (currency: Currency) => {
    const response = await client.put<Response<null>>("/user/currency", {
      currency,
    });
    return response.data;
  },
};