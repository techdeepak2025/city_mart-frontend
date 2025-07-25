import { lazy } from "react";
import { Route } from "react-router-dom";

const InventoryDashboardPage = lazy(() => import("../modules/inventory-panel/InventoryDashboardPage"));
const StoreDashboardPage = lazy(() => import("../modules/store-panel/dashboard/StoreDasboardPage"));
const PriceDashboardPage = lazy(() => import("../modules/price-panel/dashboard/PriceDashboardPage"));

export default (
  <>
    <Route path="/inventory" element={<InventoryDashboardPage />} />
    <Route path="/store" element={<StoreDashboardPage />} />
    <Route path="/price" element={<PriceDashboardPage />} />
  </>
);
