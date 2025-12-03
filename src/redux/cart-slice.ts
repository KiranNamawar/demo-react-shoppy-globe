import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/product";
import type { RootState } from "./store";

/**
 * Cart item type with product and quantity
 */
export type CartItem = {
  product: Product;
  quantity: number;
};

const initialState: CartItem[] = [];

/**
 * Cart slice for managing shopping cart state
 * Handles add, remove, update quantity, and clear cart operations
 */
const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * Add a product to the cart
     * If product already exists, increment quantity
     * @param state - Current cart state
     * @param action - Product to add
     */
    addToCart: (state, action: PayloadAction<Product>) => {
      const index = state.findIndex(
        (item) => item.product.id === action.payload.id,
      );
      if (index === -1) {
        state.push({ product: action.payload, quantity: 1 });
      } else {
        state[index].quantity++;
      }
    },
    /**
     * Remove one unit of a product from cart
     * If quantity is 1, removes the item entirely
     * @param state - Current cart state
     * @param action - Product ID to remove
     */
    removeFromCart: (state, action: PayloadAction<Product["id"]>) => {
      const index = state.findIndex((item) => item.product.id === action.payload);

      if (index !== -1) {
        const item = state[index];
        if (item.quantity <= 1) {
          state.splice(index, 1);
        } else {
          state[index].quantity--;
        }
      }
    },
    /**
     * Update the quantity of a product in cart
     * Ensures quantity is at least 1
     * @param state - Current cart state
     * @param action - Payload with product ID and new quantity
     */
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) => {
      const index = state.findIndex(
        (item) => item.product.id === action.payload.id,
      );
      if (index !== -1) {
        // Ensure quantity is at least 1
        state[index].quantity = Math.max(1, action.payload.quantity);
      }
    },
    /**
     * Remove an item completely from the cart
     * @param state - Current cart state
     * @param action - Product ID to remove
     */
    deleteFromCart: (state, action: PayloadAction<Product["id"]>) => {
      const index = state.findIndex((item) => item.product.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    /**
     * Clear all items from the cart
     * Used after successful checkout
     */
    clearCart: () => {
      return initialState;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  deleteFromCart,
  clearCart,
} = cart.actions;
export const cartReducer = cart.reducer;

// Selectors
/**
 * Get all cart items
 */
export const selectCartItems = (state: RootState) => state.cart;

/**
 * Get total number of items in cart (sum of all quantities)
 */
export const selectCartItemsCount = (state: RootState) =>
  state.cart.reduce((total, item) => total + item.quantity, 0);

/**
 * Get total price of all items in cart
 */
export const selectCartTotal = (state: RootState) =>
  state.cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
