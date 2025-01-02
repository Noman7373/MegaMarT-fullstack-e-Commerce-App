import { createSlice } from "@reduxjs/toolkit";

const userAddressObj = {
  addressList: [],
};

const addressStore = createSlice({
  name: address,
  initialState: userAddressObj,
  reducers: {
    addUserAddressDetails: (state, action) => {
      state.addressList = [...action.payload];
    },
  },
});

export const { addUserAddressDetails } = addressStore.actions;

export default addressStore.reducer;
