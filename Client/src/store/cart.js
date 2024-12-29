import { createSlice } from "@reduxjs/toolkit";

const cartStore = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    cartLoading: true,
  },
  reducers: {
    handleAddToCart: (state, action) => {
      const { cartItems, isLoading } = action.payload;
      state.cartLoading = isLoading;
      state.cart = cartItems || [];
    },
  },
});

export const { handleAddToCart } = cartStore.actions;

export default cartStore.reducer;
