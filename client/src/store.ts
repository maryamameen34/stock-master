import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { movementReducer, orderReducer, productReducer, searchSlice, stockAdjustementReducer, userReducer, warehouseReducer } from "./redux/index";


const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        search: searchSlice,
        movement: movementReducer,
        order: orderReducer,
        warehouse: warehouseReducer,
        stockAdjustement: stockAdjustementReducer
    },
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
