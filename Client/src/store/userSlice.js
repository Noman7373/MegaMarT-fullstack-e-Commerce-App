import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name: "",
  email: "",
  avater: "",
  mobile: "",
  verify_email: "",
  last_Login_date: "",
  status: "",
  address_details: [],
  shopping_cart: [],
  orderHistory: [],
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetials: (state, action) => {
      state._id = action.payload?._id;
      state.name = action.payload?.name;
      state.email = action.payload?.email;
      state.avater = action.payload?.avater;
      state.mobile = action.payload?.mobile;
      state.verify_email = action.payload?.verify_email;
      state.last_Login_date = action.payload?.last_Login_date;
      state.status = action.payload?.status;
      state.address_details = action.payload?.address_details;
      state.shopping_cart = action.payload?.shopping_cart;
      state.orderHistory = action.payload?.orderHistory;
      state.role = action.payload?.role;
    },
  },
});

export const { setUserDetials } = userSlice.actions;

export default userSlice.reducer;
