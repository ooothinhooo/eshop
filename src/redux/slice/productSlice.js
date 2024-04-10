import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  minPrice: null,
  maxPrice: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    STORE_PRODUCTS(state, action) {
      state.products = action.payload.products;
    },
    GET_PRICE_RANGE(state, action) {
      const { products } = action.payload;
      const array_price = [];
      products.map((product) => {
        array_price.push(product.price);
      });

      state.minPrice = Math.min([...array_price]);
      state.maxPrice = Math.max([...array_price]);
    },
  },
});

export const { STORE_PRODUCTS, GET_PRICE_RANGE } = productSlice.actions;

export const selectMinPrice = (state) => state.product.minPrice;
export const selectMaxPrice = (state) => state.product.maxPrice;

export const selectProducts = (state) => state.product.products;

export default productSlice.reducer;
