import React from "react";
import { Route } from "react-router-dom";
import { ROUTER_URL } from "../router.const";

const ClientLoginPage = React.lazy(() => import("@/pages/client/auth/login/ClientLogin.page"));
const ForgotPasswordPage = React.lazy(() => import("@/pages/client/auth/ForgotPassword.page"));

export const ClientAuthRoutes = (
  <>
    <Route path={ROUTER_URL.CLIENT_ROUTER.LOGIN} element={<ClientLoginPage />} />
    <Route path={ROUTER_URL.CLIENT_ROUTER.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
  </>
);
