
import React, { useEffect } from "react"
import { LuShoppingCart, LuUsers2 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineInventory } from "react-icons/md";
import { AppDispatch, RootState } from "../../../store";



const OverviewGrid: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading, error } = useSelector((state: RootState) => state.user);
    const { products } = useSelector((state: RootState) => state.product);

    const totalUsers = users?.length || 0;
    const totalProducts = products?.length || 0;
    const lastWeekUserCount = 5200;
    const lastWeekProductCount = 5200;
    const percentageChange = lastWeekUserCount
        ? Number((((totalUsers - lastWeekUserCount) / lastWeekUserCount) * 100).toFixed(2))
        : 0;

    const percentageChangeProducts = lastWeekProductCount
        ? Number((((totalProducts - lastWeekProductCount) / lastWeekProductCount) * 100).toFixed(2))
        : 0;
    return (
        <>
            <div className=" grid lg:grid-cols-4  gap-6 md:grid-cols-2 grid-cols-1 sm:grid-cols-2 lg:px-0 md:px-0 px-8">
                <div className="lg:px-3 border-b-2 shadow-lg border-indigo-800 md:px-3 px-6 py-4 rounded-sm">
                    <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-700">Total Users</p>
                        <LuUsers2 />
                    </div>
                    <div className="py-1">
                        <p className="font-semibold text-indigo-700 text-xl text-center">
                            {loading ? "Loading..." : totalUsers}
                        </p>
                        <p className="text-red-600 text-xs text-right mt-4">
                            {percentageChange}% {percentageChange > 0 ? "more" : "less"} than last 7 days
                        </p>
                    </div>
                </div>
                <div className="lg:px-3 border-b-2 shadow-lg border-gray-800 md:px-3 px-6 py-4 rounded-sm">
                    <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-700">Total Inventory</p>
                        <MdOutlineInventory />
                    </div>
                    <div className="py-1">
                        <p className="font-semibold text-gray-700 text-xl text-center">
                            {loading ? "Loading..." : totalProducts}
                        </p>
                        <p className="text-red-600 text-xs text-right mt-4">
                            {percentageChangeProducts}% {percentageChangeProducts > 0 ? "more" : "less"} than last 7 days
                        </p>
                    </div>
                </div>
                <div className="lg:px-3 border-b-2 shadow-lg  border-orange-600 md:px-3 px-6 py-4   rounded-sm">
                    <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-700 ">Total Orders</p>
                        <LuShoppingCart />
                    </div>
                    <div className="py-1">
                        <p className="font-semibold text-orange-700 text-xl text-center">15467</p>
                        <p className="text-red-600 text-xs text-right mt-4">5% more then last 7 days</p>
                    </div>
                </div>
                <div className="lg:px-3 border-b-2 shadow-lg  border-teal-600 md:px-3 px-6 py-4   rounded-sm">
                    <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-700 ">Total Orders</p>
                        <LuShoppingCart />
                    </div>
                    <div className="py-1">
                        <p className="font-semibold text-teal-700 text-xl text-center">15467</p>
                        <p className="text-red-600 text-xs text-right mt-4">5% more then last 7 days</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OverviewGrid