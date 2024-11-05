import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import store from "./store";
import { loadLoggedinUser } from "./redux/userSlice";
import { fetchProducts } from "./redux/productSlice";
import { fetchMovements } from "./redux/movementSlice";
import {
  ActivateAccountData,
  AdminDashbaord,
  CompleteRegistration,
  ForgotPassword,
  Login,
  RegisterUser,
} from "./pages/index";
import ManagerDashboard from "./pages/ManagerDashbaord";
import CustomerDashboard from "./pages/CustomerDashboard";
import ProductiveRoutes from "./routes/ProductiveRoutes";
import CustomerSignup from "./pages/CustomerSignup";

function App() {
  useEffect(() => {
    store.dispatch(loadLoggedinUser());
    store.dispatch(fetchProducts());
    store.dispatch(fetchMovements());
  }, []);
  return (
    <div className="App">
      <div className="">
        <BrowserRouter>
          <Routes>
            <Route
              path="/admin-dashboard/*"
              element={
                <ProductiveRoutes requiredRole="admin">
                  <AdminDashbaord />
                </ProductiveRoutes>
              }
            />
            <Route
              path="/manager-dashboard/*"
              element={
                <ProductiveRoutes requiredRole="manager">
                  <ManagerDashboard />
                </ProductiveRoutes>
              }
            />
            <Route
              path="/customer-dashboard/*"
              element={
                <ProductiveRoutes requiredRole="customer">
                  <CustomerDashboard />
                </ProductiveRoutes>
              }
            />
            <Route path="/sign-up" element={<RegisterUser />} />
            <Route path="/sign-up/customer" element={<CustomerSignup />} />
            <Route path="/" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path={"/activation/:activation_token"}
              element={<ActivateAccountData />}
            />
            <Route
              path={"/complete-registration/:token"}
              element={<CompleteRegistration />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
