import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import server from "../server";
import axios from "axios";
import { Warehouse, WarehouseState } from "./types/types";




export const fetchWarehouses = createAsyncThunk('warehouses/fetchWarehouses', async () => {
    const response = await axios.get(`${server}/ware-house-record` , {withCredentials : true});
    return response.data;
});

export const createWarehouse = createAsyncThunk('warehouses/createWarehouse', async (warehouse: Warehouse) => {
    const response = await axios.post(`${server}/create-ware-house`, warehouse , {withCredentials : true});
    return response.data;
});

export const updateWarehouse = createAsyncThunk('warehouses/updateWarehouse', async ({ id, warehouse }: { id: string; warehouse: Warehouse }) => {
    const response = await axios.put(`${server}/update-ware-house/${id}`, warehouse , {withCredentials : true});
    return response.data;
});

export const deleteWarehouse = createAsyncThunk('warehouses/deleteWarehouse', async (id: string) => {
    await axios.delete(`${server}/ware-house/${id}` , {withCredentials : true});
    return id;
});



const initialState: WarehouseState = {
    warehouses: [],
    loading: false,
    error: null,
};

const warehouseSlice = createSlice({
    name: 'warehouses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWarehouses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWarehouses.fulfilled, (state, action) => {
                state.loading = false;
                state.warehouses = action.payload;
            })
            .addCase(fetchWarehouses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch warehouses';
            })
            .addCase(createWarehouse.fulfilled, (state, action) => {
                state.warehouses.push(action.payload);
            })
            .addCase(updateWarehouse.fulfilled, (state, action) => {
                const index = state.warehouses.findIndex(warehouse => warehouse._id === action.payload._id);
                if (index !== -1) {
                    state.warehouses[index] = action.payload;
                }
            })
            .addCase(deleteWarehouse.fulfilled, (state, action) => {
                state.warehouses = state.warehouses.filter(warehouse => warehouse._id !== action.payload);
            });
    },
});

export default warehouseSlice.reducer;