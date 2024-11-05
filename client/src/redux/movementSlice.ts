import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllMovements, getMovementById, recordMovement } from "./services/apirecord";
import { InventoryMovement, InventoryState } from "./types/types";




export const fetchMovements = createAsyncThunk("inventory/fetchMovements", async () => {
    return await getAllMovements();
});

export const fetchMovementById = createAsyncThunk("inventory/fetchMovementById", async (id: string) => {
    return await getMovementById(id);
});

export const createMovement = createAsyncThunk("inventory/createMovement", async (data: object) => {
    return await recordMovement(data);
});


const initialState: InventoryState = {
    movements: [],
    selectedMovement: null,
    loading: false,
    error: null,
};

const inventoryMovementSlice = createSlice({
    name: "inventoryMovement",
    initialState,
    reducers: {
        clearSelectedMovement(state) {
            state.selectedMovement = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovements.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovements.fulfilled, (state, action: PayloadAction<InventoryMovement[]>) => {
                state.loading = false;
                state.movements = action.payload;
            })
            .addCase(fetchMovements.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch movements";
            })
            // Fetch movement by ID
            .addCase(fetchMovementById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovementById.fulfilled, (state, action: PayloadAction<InventoryMovement>) => {
                state.loading = false;
                state.selectedMovement = action.payload;
            })
            .addCase(fetchMovementById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch movement by ID";
            })
            // Create movement
            .addCase(createMovement.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createMovement.fulfilled, (state, action: PayloadAction<InventoryMovement>) => {
                state.loading = false;
                state.movements.push(action.payload);
            })
            .addCase(createMovement.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to create movement";
            });
    },
});

export default inventoryMovementSlice.reducer;