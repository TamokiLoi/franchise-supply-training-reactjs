import { useAdminAuthStore, useCustomerAuthStore } from "@/stores";
import { showWarning } from "@/utils";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { ROUTER_URL } from "../router.const";

interface Props {
  children: JSX.Element;
}

export const GuestAdminGuard = ({ children }: Props) => {
  const { isLoggedIn, isInitialized } = useAdminAuthStore();

  if (!isInitialized) {
    return null;
  }

  if (isLoggedIn) {
    showWarning("You are already logged in.");
    return <Navigate to={`${ROUTER_URL.ADMIN}/${ROUTER_URL.ADMIN_ROUTER.DASHBOARD}`} replace />;
  }

  return children;
};

export const GuestClientGuard = ({ children }: Props) => {
  const { customer, isInitialized } = useCustomerAuthStore();

  if (!isInitialized) {
    return null;
  }

  if (customer) {
    showWarning("You are already logged in.");
    return <Navigate to={ROUTER_URL.CLIENT} replace />;
  }

  return children;
};
