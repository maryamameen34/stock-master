

import React, { createContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ManagerSidebar, Topbar } from "../components/layout/index";
import { Route, Routes } from "react-router-dom";
import MainPage from "../components/admin/Home";
import {
    AddSupplier,
    AddWareHouse,
    AllNotifications,
    CreateCoustomer,
    CreateStockAdjustement,
    CustomerList,
    EditUser,
    InviteUser,
    SupplierList,
    UpdateWareHouse,
    UserNotification,
    UsersRecords,
    WareHouseDetails,
    WarehouseList,
} from "../components/admin/index";
import AddProduct from "../components/products/AddProduct";
import ProductList from "../components/products/Products";
import ProductDetails from "../components/products/productDetails";
import UserDetails from "../components/admin/users/user-details";
import StockAdjustmentList from "../components/admin/stock-adjustement/stock-records";
import ProfileSettings from "../components/settings/ProfileSettings";
import CustomerSidebar from "../components/layout/customer/CustomerSidebar";
import UserOrders from "../components/orders/UserOrder";

const CustomerDashboard: React.FC = () => {
    const [collapseSidebar, setCollapseSidebar] = useState(false);
    const sidebarCollapse = () => {
        setCollapseSidebar(!collapseSidebar);
    };

    const MyContext = createContext({});
    const values = {};

    return (
        <>
            <Helmet>
                <title>
                    {" "}
                    Stock Master | New and Used Mobiles for Sale | Mbl pricing & Reviews{" "}
                </title>
            </Helmet>
            <MyContext.Provider value={values}>
                <div className="flex min-h-screen">
                    <div
                        className={`fixed left-0 h-full bg-white z-10 shadow-lg transform transition-transform duration-300 ease-in-out 
              ${collapseSidebar ? "translate-x-0" : "-translate-x-full"
                            } lg:-translate-x-0 md:translate-x-0`}
                    >
                        <CustomerSidebar
                            collapseSidebar={collapseSidebar}
                            sidebarCollapse={sidebarCollapse}
                        />
                    </div>
                    <div
                        className={`flex-1 z-[100%] opacity-1 transition-all duration-300 
              ${collapseSidebar ? "ml-32" : "ml-0 md:ml-16 lg:ml-0"}`}
                    >
                        <div>
                            <Topbar
                                sidebarCollapse={sidebarCollapse}
                                collapseSidebar={collapseSidebar}
                            />
                        </div>
                        <div className="p-4 ml-12">
                            <Routes>
                                <Route path="" element={<ProductList />} />
                                <Route
                                    path="inventory-products-data"
                                    element={<ProductList />}
                                />
                                <Route
                                    path="product-details/:id"
                                    element={<ProductDetails />}
                                />
                                <Route
                                    path="my-orders"
                                    element={<UserOrders />} />
                                <Route path="notifications" element={<UserNotification />} />
                                <Route path="profile-setting/" element={<ProfileSettings />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </MyContext.Provider>
        </>
    );
};

export default CustomerDashboard;
