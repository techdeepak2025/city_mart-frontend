import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROLES } from "../../../constants/roles";

const roleBasedAccess = {
  "/admin": [ROLES.ADMIN],
  "/store": [ROLES.STORE_MANAGER],
  "/inventory": [ROLES.INVENTORY_STAFF],
  "/price": [ROLES.PRICE_MANAGER],
};

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");
  return token && role;
};

export default function ProtectedRoute() {
  const location = useLocation();
  const role = localStorage.getItem("userRole");

  const allowedRoles = Object.entries(roleBasedAccess).find(([prefix]) =>
    location.pathname.startsWith(prefix)
  )?.[1];

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
