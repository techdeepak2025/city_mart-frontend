import { lazy } from "react";
import { Route } from "react-router-dom";
import AdminLayout from "../modules/admin-panel/layout/AdminLayout";

const AdminDashboardPage = lazy(() =>
  import("../modules/admin-panel/dashboard/AdminDashboardPage")
);
const AdminUserPage = lazy(() =>
  import("../modules/admin-panel/user/AdminUserPage")
);
const AdminStorePage = lazy(() =>
  import("../modules/admin-panel/store/AdminStorePage")
);
const AdminStatePage = lazy(() =>
  import("../modules/admin-panel/state/AdminStatePage")
);
const AdminCityPage = lazy(() =>
  import("../modules/admin-panel/city/AdminCityPage")
);
const AdminRolePage = lazy(() =>
  import("../modules/admin-panel/role/AdminRolePage")
);
const AdminCategoryPage = lazy(() =>
  import("../modules/admin-panel/category/AdminCategoryPage")
);
const AdminSubCategoryPage = lazy(() =>
  import("../modules/admin-panel/subCategory/AdminSubCategoryPage")
);
const AdminBrandPage = lazy(() =>
  import("../modules/admin-panel/brand/AdminBrandPage")
);
const AdminProductPage = lazy(() =>
  import("../modules/admin-panel/product/AdminProductPage")
);
const AdminMeasurementPage = lazy(() =>
  import("../modules/admin-panel/measurement/AdminMeasurementPage")
);
const AdminPricePage = lazy(() =>
  import("../modules/admin-panel/price/AdminPricePage")
);
const AdminStockPage = lazy(() =>
  import("../modules/admin-panel/stock/AdminStockPage")
);

export default (
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<AdminDashboardPage />} />
    <Route path="states" element={<AdminStatePage />} />
    <Route path="cities" element={<AdminCityPage />} />
    <Route path="stores" element={<AdminStorePage />} />
    <Route path="roles" element={<AdminRolePage />} />
    <Route path="users" element={<AdminUserPage />} />
    <Route path="categories" element={<AdminCategoryPage />} />
    <Route path="sub-categories" element={<AdminSubCategoryPage />} />
    <Route path="brands" element={<AdminBrandPage />} />
    <Route path="products" element={<AdminProductPage />} />
    <Route path="measurements" element={<AdminMeasurementPage />} />
    <Route path="product-prices" element={<AdminPricePage />} />
    <Route path="product-stocks" element={<AdminStockPage />} />
  </Route>
);
