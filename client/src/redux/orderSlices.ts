import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Order, UpdateOrderStatusPayload } from "./types/types";
import server from "../server";

export const placeOrder = createAsyncThunk(
    "order/placeOrder",
    async (orderData: { productId: string; quantity: number; userId: string }) => {
        const response = await axios.post(`${server}/create-order`, orderData);
        return response.data;
    }
);

export const fetchAllOrders = createAsyncThunk(
    "orders/fetchAllOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${server}/all-orders`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateOrderStatus = createAsyncThunk<Order, UpdateOrderStatusPayload>(
    "orders/updateStatus",
    async ({ orderId, newStatus }) => {
        const response = await axios.put<Order>(`${server}/update-order-status`, { orderId, newStatus }); 
        return response.data;
    }
);



export const fetchUserOrders = createAsyncThunk(
    "orders/fetchUserOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${server}/get-user-orders`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);
const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [] as Order[],
        status: "idle",
        error: null as string | any,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(placeOrder.pending, (state) => {
                state.status = "loading";
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.orders.push(action.payload);
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchAllOrders.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.orders = action.payload;
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(fetchUserOrders.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.orders = action.payload;
            })
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default orderSlice.reducer;
