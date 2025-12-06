import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cart-slice";
import { searchReducer } from "./search-slice";

/**
 * Redux store configuration
 * Combines cart and search reducers
 */
const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
  },
});

export default store;
