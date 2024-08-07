import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";

console.log('authReducer:', authSlice);
const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
