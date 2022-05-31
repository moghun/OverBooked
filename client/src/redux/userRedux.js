import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logOut: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
    },
    addToWishlist: (state, action) => {
      state.currentUser.wishlist.push({ product_id: action.payload });
    },
    removeFromWishlist: (state, action) => {
      for (let index = 0; index < state.currentUser.wishlist.length; index++) {
        const product = state.currentUser.wishlist[index];
        if (product["product_id"] === action.payload) {
          state.currentUser.wishlist.splice(index, 1);
          break;
        }
      }
    },
    clearWishlist: (state) => {
      state.currentUser.wishlist.splice(0, state.currentUser.wishlist.length);
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logOut,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = userSlice.actions;
export default userSlice.reducer;
