import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderHistory: [],
  },
  reducers: {
    setOrder: (state, action) => {
      state.orderHistory = [...action.payload];
    },
  },
});

const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;
