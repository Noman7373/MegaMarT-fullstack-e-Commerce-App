import { createSlice } from "@reduxjs/toolkit";

const productCategory = {
  allCategories: [],
  subCategories: [],
  product: [],
};

const productSlice = createSlice({
  name: "Products",
  initialState: productCategory,
  reducers: {
    addProductCategory: (state, action) => {
      state.allCategories = [...state.allCategories, ...action.payload];
    },
  },
});

export const { addProductCategory } = productSlice.actions;

export default productSlice.reducer;
