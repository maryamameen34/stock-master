import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import server from "../server";
import { SearchState } from "./types/types";




export const fetchSearchResults = createAsyncThunk<any, string>(
    'search/fetchResults',
    async (term: string) => {
        const response = await fetch(`${server}/products/search?query=${term}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }
);


export const fetchUserSearchResults = createAsyncThunk<any, string>(
    'users/fetchSearchResults',
    async (term: string) => {
        const response = await fetch(`${server}/users/search?query=${term}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }
);



const initialState: SearchState = {
    searchTerm: '',
    searchData: [],
};



const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchTerm(state, action) {
            state.searchTerm = action.payload;
        },
        clearSearch(state) {
            state.searchTerm = '';
            state.searchData = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.searchData = action.payload;
            })
            .addCase(fetchSearchResults.rejected, (state) => {
                state.searchData = [];
            })
            .addCase(fetchUserSearchResults.fulfilled, (state, action) => {
                state.searchData = action.payload;
            })
            .addCase(fetchUserSearchResults.rejected, (state) => {
                state.searchData = [];
            })
    },
});


export const { setSearchTerm, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;