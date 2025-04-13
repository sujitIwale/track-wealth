import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user";
import { updateCurrency } from "../thunks/user";

type UserState = {
  user: User | null;
  currency: string;
};

const initialState: UserState = {
  user: null,
  currency: "USD",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.currency = action.payload?.currency || "USD";
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      state.user = {
        ...state.user,
        ...action.payload,
      } as User;

      if (action.payload.currency) {
        state.currency = action.payload.currency;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateCurrency.fulfilled, (state, action:PayloadAction<null, string, { arg: string }>) => {
      const currency = action.meta.arg;
      state.currency = currency;
    });
  },
});

export const { setUser, updateUser } = userSlice.actions;
export default userSlice;
