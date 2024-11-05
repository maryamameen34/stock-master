// src/components/UpdateWareHouseForm.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from '../../store';
import { Warehouse } from '../../redux/types/types';
import { fetchWarehouses, updateWarehouse } from '../../redux/warehouseSlice';

const UpdateWareHouseForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const warehouse = useSelector((state: RootState) =>
        state.warehouse.warehouses.find((wh) => wh._id === id)
    );

    const [formState, setFormState] = useState<Warehouse>({
        _id: '',
        name: '',
        location: '',
        capacity: 0,
    });

    useEffect(() => {
        if (!warehouse) {
            store.dispatch(fetchWarehouses());
        } else {
            setFormState(warehouse);
        }
    }, [dispatch, warehouse]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        store.dispatch(updateWarehouse({ id: id!, warehouse: formState }));
        navigate(`/admin-dashboard/ware-house-details/${id}`);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
            <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Location</label>
                <input
                    type="text"
                    name="location"
                    value={formState.location}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Capacity</label>
                <input
                    type="number"
                    name="capacity"
                    value={formState.capacity}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Update Warehouse
            </button>
        </form>
    );
};

export default UpdateWareHouseForm;
