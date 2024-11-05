// src/ProductiveRoutes.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface ProductiveRouteProps {
  children: React.ReactNode;
  requiredRole: string;
}

const ProductiveRoutes: React.FC<ProductiveRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.user
  );
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  if (user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
};

export default ProductiveRoutes;
