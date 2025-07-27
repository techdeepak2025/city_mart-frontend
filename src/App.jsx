import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import PublicRoutes from "./routes/PublicRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import PanelRoutes from "./routes/PanelRoutes";
import CustomerRoutes from "./routes/CustomerRoutes";
import ProtectedRoute from "./modules/common/auth/ProtectedRoute";
import GroceryLoader from "./ui/loader/GroceryLoader";

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex w-screen h-screen inset-0 bg-purple-100 shadow-lg justify-center items-center text-lg text-white">
            <GroceryLoader />
          </div>
        }
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
