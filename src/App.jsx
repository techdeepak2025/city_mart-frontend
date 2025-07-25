import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import PublicRoutes from "./routes/PublicRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import PanelRoutes from "./routes/PanelRoutes";
import CustomerRoutes from "./routes/CustomerRoutes";
import ProtectedRoute from "./modules/common/auth/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={<div className="text-center mt-10 text-lg">Loading...</div>}
      >
        <Routes>
          {/* Public Routes */}
          {PublicRoutes}

          {/* Customer Layout Routes */}
          {CustomerRoutes}

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            {AdminRoutes}
            {PanelRoutes}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
