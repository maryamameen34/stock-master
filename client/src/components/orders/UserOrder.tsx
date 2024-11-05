import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../../redux/orderSlices";
import store, { RootState } from "../../store";
import { FaShoppingCart } from "react-icons/fa";

const UserOrders = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((state: RootState) => state.order);
    const { loading, error } = useSelector((state: RootState) => state.user);


    useEffect(() => {
        store.dispatch(fetchUserOrders());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="pt-20 px-5">
        <h2 className="text-2xl font-bold text-center mb-6">Your Orders</h2>
        {orders.length === 0 ? (
            <div className="text-center py-10">
                <p className="text-gray-600">You have no orders yet.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order: any) => (
                    <div key={order._id} className="bg-white p-4 rounded-lg shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold">{order.productId.title}</h3>
                        </div>
                        <span className="text-gray-500">Order ID: {order._id}</span>
                        <p className="text-gray-700">Quantity: {order.quantity}</p>
                        <p className="text-gray-500">Ordered At: {new Date(order.orderedAt).toLocaleDateString()}</p>
                        <p className="mt-2 text-sm text-gray-500">Email: {order.userId.email}</p>
                        <div className="flex items-center justify-between mt-4">
                            <p className="text-green-600 font-semibold">Status: {order.status}</p>
                            <button className="flex items-center text-blue-500 hover:text-blue-700">
                                <FaShoppingCart className="mr-1" /> View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
    );
};

export default UserOrders;
