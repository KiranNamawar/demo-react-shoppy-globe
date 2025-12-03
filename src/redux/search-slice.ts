import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/**
 * Search state interface
 */
interface SearchState {
    query: string;
}

const initialState: SearchState = {
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
         * @param state - Current state
         * @param action - Payload containing the search query string
         */
        setSearchQuery: (state, action: PayloadAction<string>) => {
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
export const selectSearchQuery = (state: { search: SearchState }) =>
    state.search.query;
