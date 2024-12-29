import { createSlice } from "@reduxjs/toolkit";

const cartStore = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    handleAddToCart: (state, action) => {
      state.cart = [...action.payload];
    },
  },
});

export const { handleAddToCart } = cartStore.actions;

export default cartStore.reducer;
