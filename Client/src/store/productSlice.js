import { createSlice } from "@reduxjs/toolkit";

const productCategory = {
  allCategories: [],
  allSubcategories: [],
  product: [],
};

const productSlice = createSlice({
  name: "Products",
  initialState: productCategory,
  reducers: {
    addProductCategory: (state, action) => {
      state.allCategories = [...action.payload];
    },
    addSubcategory: (state, action) => {
      state.allSubcategories = [...action.payload];
    },
  },
});

export const { addProductCategory, addSubcategory } = productSlice.actions;

export default productSlice.reducer;
