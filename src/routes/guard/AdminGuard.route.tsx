import { Loading } from "@/layouts";
import { useAdminAuthStore } from "@/stores";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTER_URL } from "../router.const";

const AdminGuard = () => {
  const user = useAdminAuthStore((s) => s.user);
  const isInitialized = useAdminAuthStore((s) => s.isInitialized);

  if (!isInitialized) {
    return <Loading />;
  }

  // 1: not login
  if (!user) {
    return <Navigate to={ROUTER_URL.ADMIN_ROUTER.LOGIN} replace />;
  }

  // 2: logged but not select role context
  if (!user.active_context) {
    return <Navigate to={ROUTER_URL.ADMIN_ROUTER.LOGIN} replace />;
  }

  return <Outlet />;
};

export default AdminGuard;
