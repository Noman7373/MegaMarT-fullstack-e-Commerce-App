import { createSlice } from "@reduxjs/toolkit";

const productCategory = {
  allCategories: [],
  // loadingCategory: true,
  allSubcategories: [],
  allProducts: [],
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
    addAllProducts: (state, action) => {
      state.allProducts = [...action.payload];
    },
  },
});

export const { addProductCategory, addSubcategory, addAllProducts } =
  productSlice.actions;

export default productSlice.reducer;
