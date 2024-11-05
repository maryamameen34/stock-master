import React, { createContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AdminSidebar, Topbar } from "../components/layout/index";
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
import UpdateProductData from "../components/products/UpdateProductData";
import AllOrders from "../components/orders/AllOrders";
import CustomerAdd from "../components/admin/customer/CustomerAdd";
import UpdatePassword from "../components/settings/UpdatePassword";

const AdminDashboard: React.FC = () => {
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
              ${
                collapseSidebar ? "translate-x-0" : "-translate-x-full"
              } lg:-translate-x-0 md:translate-x-0`}
          >
            <AdminSidebar
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
                <Route path="" element={<MainPage />} />
                <Route path="users/invite-user" element={<InviteUser />} />
                <Route path="users/users-record" element={<UsersRecords />} />
                <Route path="product/add" element={<AddProduct />} />
                <Route
                  path="inventory-products-data"
                  element={<ProductList />}
                />
                <Route
                  path="product-details/:id"
                  element={<ProductDetails />}
                />
                <Route
                  path="update-product/:id"
                  element={<UpdateProductData />}
                />
                <Route path="supplier/add-supplier" element={<AddSupplier />} />
                <Route
                  path="supplier/suppliers-record"
                  element={<SupplierList />}
                />
                <Route path="user-details/:id" element={<UserDetails />} />
                <Route path="edit-user/:id" element={<EditUser />} />
                <Route
                  path="customers/invite-customer"
                  element={<CreateCoustomer />}
                />
                <Route
                  path="customers/add-customer"
                  element={<CustomerAdd />}
                />
                <Route
                  path="customers/customers-record"
                  element={<CustomerList />}
                />
                <Route
                  path="stock-adjustement/create"
                  element={<CreateStockAdjustement />}
                />
                <Route
                  path="stock-adjustement/record"
                  element={<StockAdjustmentList />}
                />
                <Route
                  path="ware-house/create-ware-house"
                  element={<AddWareHouse />}
                />
                <Route
                  path="ware-house/ware-house-record"
                  element={<WarehouseList />}
                />
                <Route
                  path="update-ware-house/:id"
                  element={<UpdateWareHouse />}
                />
                <Route
                  path="ware-house-details/:id"
                  element={<WareHouseDetails />}
                />
                <Route path="orders-list" element={<AllOrders />} />
                <Route path="notifications" element={<AllNotifications />} />
                <Route path="profile-setting/" element={<ProfileSettings />} />
                <Route path="settings/update-password/" element={<UpdatePassword />} />
              </Routes>
            </div>
          </div>
        </div>
      </MyContext.Provider>
    </>
  );
};

export default AdminDashboard;
