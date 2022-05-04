import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    amount: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.amount += 1;
      state.products.push(action.payload);
      state.total += action.payload.cost * action.payload.amount;
    },
    removeProduct: (state, action) => {
      state.amount -= 1;
      state.total -= action.payload.cost * action.payload.amount;
      state.products= state.products.filter(x => x._id !== action.payload._id);
    },
  },
});

export const { addProduct } = cartSlice.actions;
export const { removeProduct } = cartSlice.actions;
export default cartSlice.reducer;

/*
      state.amount =0;
      state.products= [];
      state.total = 0;
*/