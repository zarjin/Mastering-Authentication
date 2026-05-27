import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux/features/authSlice.ts";

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
