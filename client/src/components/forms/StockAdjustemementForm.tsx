import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from '../../store';
import { createStockAdjustment } from '../../redux/stock-adjustement-Slice';

const StockAdjustmentForm: React.FC = () => {
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.product.products);

    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [reason, setReason] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        store.dispatch(createStockAdjustment({ productId, quantity, reason }));
        setProductId('');
        setQuantity(0);
        setReason('');
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto space-y-6">
            <h2 className="text-xl  font-semibold text-gray-800 text-center">Create Stock Adjustment</h2>

            <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Product</label>
                <select
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
                    onChange={(e) => setProductId(e.target.value)}
                    value={productId}
                    required
                >
                    <option value="" disabled>Select a product</option>
                    {products.map((product: any) => (
                        <option key={product._id} value={product._id}>
                            {product.title}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Quantity</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
                    required
                    placeholder="Enter quantity"
                />
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Reason</label>
                <input
                    type="text"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
                    required
                    placeholder="Enter reason for adjustment"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-semibold p-3 rounded hover:bg-indigo-700 transition duration-200"
            >
                Submit Adjustment
            </button>
        </form>
    );
};

export default StockAdjustmentForm;
