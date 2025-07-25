import { lazy } from "react";
import { Route } from "react-router-dom";
import CustomerLayout from "../modules/customer-web/layout/CustomerLayout";
import AccountLayout from "../modules/customer-web/account/AccountLayout";
import CustomerProtectedRoute from "../modules/customer-web/auth/ProtectedCustomerRoute";

const HomePage = lazy(() => import("../modules/customer-web/home/HomePage"));
const ProductListPage = lazy(() =>
  import("../modules/customer-web/product-list/ProductListPage")
);
const ProductDetailPage = lazy(() =>
  import("../modules/customer-web/product-detail/ProductDetailPage")
);
const OrderPage = lazy(() => import("../modules/customer-web/order/OrderPage"));
const AddressPage = lazy(() =>
  import("../modules/customer-web/address/AddressPage")
);
const GiftCardPage = lazy(() =>
  import("../modules/customer-web/gift-card/GiftCardPage")
);
const AccountPrivacyPage = lazy(() =>
  import("../modules/customer-web/account-privacy/AccountPrivacyPage")
);
const CheckoutPage = lazy(() =>
  import("../modules/customer-web/checkout/CheckoutPage")
);
const SearchPage = lazy(() =>
  import("../modules/customer-web/search/SearchPage")
);

export default (
  <>
    <Route path="/" element={<CustomerLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/:slug/:subSlug?" element={<ProductListPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />

      {/* 🔒 Protected Account Routes */}
      <Route element={<CustomerProtectedRoute />}>
        <Route path="/account" element={<AccountLayout />}>
          <Route path="orders" element={<OrderPage />} />
          <Route path="addresses" element={<AddressPage />} />
          <Route path="gift-card" element={<GiftCardPage />} />
          <Route path="privacy" element={<AccountPrivacyPage />} />
        </Route>
      </Route>
    </Route>

    <Route element={<CustomerProtectedRoute />}>
      <Route path="/checkout" element={<CheckoutPage />} />
    </Route>

    <Route path="/s" element={<SearchPage />} />
  </>
);
