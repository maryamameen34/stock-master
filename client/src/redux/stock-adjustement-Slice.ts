import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import server from "../server";
import axios from "axios";
import { StockAdjustment, StockAdjustmentState } from "./types/types";






export const fetchStockAdjustments = createAsyncThunk(
    'stockAdjustments/fetchStockAdjustments',
    async () => {
        const response = await axios.get(`${server}/stock-adjustement-data` , {withCredentials : true});
        return response.data;
    }
);


export const createStockAdjustment = createAsyncThunk(
    'stockAdjustments/createStockAdjustment',
    async (adjustment: StockAdjustment) => {
        const response = await axios.post(`${server}/create-stock-adjustement`, adjustment , {withCredentials : true});
        return response.data;
    }
);


const initialState: StockAdjustmentState = {
    stockAdjustments: [],
    loading: false,
    error: null,
};


const stockAdjustmentSlice = createSlice({
    name: 'stockAdjustments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStockAdjustments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStockAdjustments.fulfilled, (state, action) => {
                state.loading = false;
                state.stockAdjustments = action.payload;
            })
            .addCase(fetchStockAdjustments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch stock adjustments';
            })
            .addCase(createStockAdjustment.fulfilled, (state, action) => {
                state.stockAdjustments.push(action.payload);
            });
    },
});

export default stockAdjustmentSlice.reducer;