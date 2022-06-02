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
      if (state.products.find((o) => o._id === action.payload._id)) {
        if (
          state.products[
            state.products.findIndex((x) => x._id === action.payload._id)
          ].amount +
            action.payload.amount >
          action.payload.maxAmount
        ) {
          state.total +=
            action.payload.cost *
            (action.payload.maxAmount -
              state.products[
                state.products.findIndex((x) => x._id === action.payload._id)
              ].amount);
          state.products[
            state.products.findIndex((x) => x._id === action.payload._id)
          ].amount = action.payload.maxAmount;
        } else {
          state.total += action.payload.cost * action.payload.amount;
          state.products[
            state.products.findIndex((x) => x._id === action.payload._id)
          ].amount += action.payload.amount;
        }
      } else {
        state.amount += 1;
        state.products.push(action.payload);
        state.total += action.payload.cost * action.payload.amount;
      }
    },
    removeProduct: (state, action) => {
      state.amount -= 1;
      state.total -= action.payload.cost * action.payload.amount;
      state.products = state.products.filter(
        (x) => x._id !== action.payload._id
      );
    },
    clearCart: (state) => {
      state.amount = 0;
      state.products = [];
      state.total = 0;
    },
  },
});

export const { addProduct } = cartSlice.actions;
export const { removeProduct } = cartSlice.actions;
export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
