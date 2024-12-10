import { createSlice } from "@reduxjs/toolkit";

const productCategory = {
  name: "",
  image: "",
};

const productSlice = createSlice({
  name: "Category",
  initialState: {
    category: productCategory,
  },

  reducers: {
    addProductCategory: (state, action) => {
      state.category.name = action.payload;
      state.category.image = action.payload;
    },
  },
});

export const { addProductCategory } = productSlice.actions;

export default productSlice.reducer;
