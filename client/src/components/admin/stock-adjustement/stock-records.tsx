import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from '../../../store';
import { fetchStockAdjustments } from '../../../redux/stock-adjustement-Slice';

const StockAdjustmentList: React.FC = () => {
    const dispatch = useDispatch();
    const { stockAdjustments, loading, error } = useSelector((state: RootState) => state.stockAdjustement);

    useEffect(() => {
        store.dispatch(fetchStockAdjustments());
    }, [dispatch]);

    if (loading) return <p className="text-center text-indigo-600 font-medium">Loading...</p>;
    if (error) return <p className="text-center text-red-500 font-medium">{error}</p>;

    return (
        <div className="p-8 bg-gray-50 mt-20 rounded-xl shadow-lg max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-indigo-700 mb-8 text-center">Stock Adjustments</h2>
            <ul className="space-y-6">
                {stockAdjustments.map((adjustment: any) => (
                    <li key={adjustment._id} className="p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                        <p className="text-lg font-medium text-gray-800"><strong >Product:</strong> {adjustment.productId.title}</p>
                        <div className="text-sm text-gray-600 mt-2 space-y-1">
                            <p><strong>Quantity:</strong> {adjustment.quantity}</p>
                            <p><strong>Reason:</strong> {adjustment.reason}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StockAdjustmentList;
