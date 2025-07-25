import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// Simulate auth (replace with actual auth context or Redux selector)
const isAuthenticated = () => {
  const customer = localStorage.getItem("customer");
  return !!customer;
};

export default function CustomerProtectedRoute() {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
