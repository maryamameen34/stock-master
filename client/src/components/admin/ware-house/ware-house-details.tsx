// src/components/WareHouseDetails.tsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from '../../../store';
import { fetchWarehouses } from '../../../redux/warehouseSlice';

const WareHouseDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const warehouse = useSelector((state: RootState) =>
        state.warehouse.warehouses.find((wh) => wh._id === id)
    );

    useEffect(() => {
        if (!warehouse) {
            store.dispatch(fetchWarehouses());
        }
    }, [dispatch, warehouse]);

    if (!warehouse) {
        return <p>Loading warehouse details...</p>;
    }

    return (
        <div className="p-4 mt-24 max-w-96 mx-auto bg-white rounded shadow-md">
            <h2 className="text-lg font-semibold mb-4">Warehouse Details</h2>
            <p><strong>Name:</strong> {warehouse.name}</p>
            <p><strong>Location:</strong> {warehouse.location}</p>
            <p><strong>Capacity:</strong> {warehouse.capacity}</p>
        </div>
    );
};

export default WareHouseDetails;
