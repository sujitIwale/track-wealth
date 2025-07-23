import { combineReducers, configureStore } from "@reduxjs/toolkit";
import uiSlice from "./slices/uiSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import dataSlice from "./slices/dataSlice";
import userSlice from "./slices/userSlice";
import transactionQuery from "./query/transaction";

const combinedReducers = combineReducers({
    ui: uiSlice.reducer,
    data: dataSlice.reducer,
    user: userSlice.reducer,
    transaction: transactionQuery.reducer,
})

const store = configureStore({
   reducer: combinedReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(transactionQuery.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;