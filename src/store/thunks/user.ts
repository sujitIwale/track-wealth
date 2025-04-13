import { userApi } from "@/api/user";
import { Currency } from "@/constants/misc";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateCurrency = createAsyncThunk(
  "user/updateCurrency",
  async (currency: Currency, { rejectWithValue }) => {
    try {
      const response = await userApi.updateCurrency(currency);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);