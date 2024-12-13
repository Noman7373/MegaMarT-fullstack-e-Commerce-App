import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/userSlice.js";
import productReducer from "../store/productSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    Products: productReducer,
  },
});
