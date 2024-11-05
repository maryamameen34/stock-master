import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../store";
import { fetchAllOrders, updateOrderStatus } from "../../redux/orderSlices"; // Make sure you have an action for updating status
import { FaUser, FaTruck } from "react-icons/fa";

const AllOrders = () => {
    const dispatch = useDispatch();
    const { orders, status, error } = useSelector((state: RootState) => state.order);

    useEffect(() => {
        store.dispatch(fetchAllOrders());
    }, [dispatch]);

    const handleStatusUpdate = (orderId: string, currentStatus: string) => {
        const newStatus = currentStatus === "pending" ? "processed" : "delivered";
        store.dispatch(updateOrderStatus({ orderId, newStatus }));
        window.location.reload()
    };

    if (status === "loading") return <div className="text-center py-10"><p>Loading...</p></div>;
    if (status === "failed") return <div className="text-center py-10"><p className="text-red-600">{error}</p></div>;

    return (
        <div className="pt-20 px-5">
            <h2 className="text-2xl font-bold text-center mb-6">All Orders</h2>
            {orders.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-600">No orders found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.map((order: any) => (
                        <div key={order._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold">{order.productId.title}</h3>
                            </div>
                            <span className="text-gray-500">Order ID: {order._id}</span>

                            <div className="text-sm text-gray-500 mt-4 mb-2">
                                <FaUser className="inline-block mr-1" /> {order.userId.first_name} - {order.userId.email}
                            </div>
                            <p className="text-gray-700">Quantity: {order.quantity}</p>
                            <p className="text-gray-700">Price: {order.productId.salePrice} PKR</p>
                            <div className="flex items-center justify-between mt-4">
                                <button
                                    onClick={() => handleStatusUpdate(order._id, order.status)}
                                    className={`text-white font-semibold px-3 py-1 rounded-md ${order.status === "pending" ? "bg-yellow-500 hover:bg-yellow-600" :
                                        order.status === "processed" ? "bg-blue-500 hover:bg-blue-600" :
                                            "bg-green-500 hover:bg-green-600"
                                        }`}
                                >
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </button>
                                <FaTruck className="text-gray-400" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllOrders;
