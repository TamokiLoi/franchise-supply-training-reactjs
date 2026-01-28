import { useAuthStore } from "@/stores";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { ROUTER_URL } from "../router.const";

interface Props {
  children: JSX.Element;
}

export const GuestGuard = ({ children }: Props) => {
  const { isLoggedIn, isInitialized } = useAuthStore();

  if (!isInitialized) {
    return null; 
  }

  if (isLoggedIn) {
    return <Navigate to={`${ROUTER_URL.ADMIN}/${ROUTER_URL.ADMIN_ROUTER.DASHBOARD}`} replace />;
  }

  return children;
};
