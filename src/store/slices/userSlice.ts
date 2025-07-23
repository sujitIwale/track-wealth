import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user";
import { updateCurrency } from "../thunks/user";

type UserState = User & {
  currency: string;
}

const initialState: UserState = {
  id: "",
  email: "",
  name: null,
  profilePicture: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  onboarded: false,
  currency: 'INR',
  addedTransaction: false,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      console.log({ payload: action.payload });
      state = {
        ...state,
        ...action.payload,
      } as UserState;
      return state;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      state = {
        ...state,
        ...action.payload,
      } as UserState;

      return state;
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
