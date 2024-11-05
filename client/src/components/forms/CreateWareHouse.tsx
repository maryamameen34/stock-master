// src/components/WarehouseForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createWarehouse } from '../../redux/warehouseSlice';
import store from '../../store';

const WarehouseForm: React.FC = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [capacity, setCapacity] = useState<number>(0);
    const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newWarehouse = { name, location, capacity };
        store.dispatch(createWarehouse(newWarehouse));
        setName('');
        setLocation('');
        setCapacity(0);
    };

    return (
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 my-8">
            <h2 className="text-lg font-semibold text-gray-700 text-center mb-6">Add New Warehouse</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-600 font-medium mb-2">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter warehouse name"
                    />
                </div>
                <div>
                    <label className="block text-gray-600 font-medium mb-2">Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter location"
                    />
                </div>
                <div>
                    <label className="block text-gray-600 font-medium mb-2">Capacity</label>
                    <input
                        type="number"
                        value={capacity}
                        onChange={(e) => setCapacity(Number(e.target.value))}
                        required
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter capacity"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-300"
                >
                    Add Warehouse
                </button>
            </form>
        </div>
    );
};

export default WarehouseForm;
