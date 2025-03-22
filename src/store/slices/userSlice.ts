import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user";

type UserState = {
  user: User | null;
};

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      state.user = {
        ...state.user,
        ...action.payload,
      } as User;
    },
  },
});

export const { setUser, updateUser } = userSlice.actions;
export default userSlice;
