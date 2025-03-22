import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./slices/uiSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import dataSlice from "./slices/dataSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        data: dataSlice.reducer,
        user: userSlice.reducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;