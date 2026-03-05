import { Loading } from "@/layouts";
import { useCustomerAuthStore } from "@/stores";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTER_URL } from "../router.const";

const ClientGuard = () => {
  const customer = useCustomerAuthStore((s) => s.customer);
  const isInitialized = useCustomerAuthStore((s) => s.isInitialized);
  
  if (!isInitialized) {
    return <Loading />;
  }

  if (!customer) {
    return <Navigate to={ROUTER_URL.CLIENT_ROUTER.LOGIN} replace />;
  }

  return <Outlet />;
};

export default ClientGuard;
