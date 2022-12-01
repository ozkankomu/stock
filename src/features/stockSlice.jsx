import { createSlice } from "@reduxjs/toolkit";

const stockSlice = createSlice({
  name: "stock",

  initialState: {
    puchases: null,
    sales: null,
    products: null,
    brands: null,
    firms: null,
    loading: false,
    error: false,
    categories: null,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },

    getSuccess: (state, { payload: { data, url } }) => {
      state.loading = false;
      state[url] = data;
    },
    getProCatBrandsSuccess: (state, { payload }) => {
      state.loading = false;
      state.products = payload[0];
      state.categories = payload[1];
      state.brands = payload[2];
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, getSuccess, fetchFail, getProCatBrandsSuccess } =
  stockSlice.actions;
export default stockSlice.reducer;
