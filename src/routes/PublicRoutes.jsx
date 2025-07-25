import { lazy } from "react";
import { Route } from "react-router-dom";

const Login = lazy(() => import("../modules/common/login/LoginPage"));

export default (
  <>
    <Route path="/login" element={<Login />} />
  </>
);
