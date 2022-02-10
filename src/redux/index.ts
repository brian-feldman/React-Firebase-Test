import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import configSlice from "./slice/config.slice";

const store = configureStore({
  reducer: {
    config: configSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
