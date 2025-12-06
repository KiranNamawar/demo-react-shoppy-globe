import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
};

/**
 * Search slice for managing product search functionality
 * Used to filter products in the ProductList component
 */
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    /**
     * Set the search query
     */
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    /**
     * Clear the search query
     */
    clearSearchQuery: (state) => {
      state.query = "";
    },
  },
});

export const { setSearchQuery, clearSearchQuery } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;

// Selectors
export const selectSearchQuery = (state) => state.search.query;
