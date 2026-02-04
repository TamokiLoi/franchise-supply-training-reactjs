import {
    CreditCard,
    Gift,
    LayoutDashboard,
    Package,
    ShoppingCart,
    Store,
    Tags,
    UserCircle,
    Users,
    Warehouse,
} from "lucide-react";
import React, { type JSX } from "react";
import { ROUTER_URL } from "../router.const";

export type AdminMenuItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
  component: React.LazyExoticComponent<() => JSX.Element>;
  isEnd?: boolean;
};

/* TODO: auth pages: login, verify token, reset password, change password */
export const ADMIN_MENU: AdminMenuItem[] = [
  {
    label: "Dashboard",
    path: ROUTER_URL.ADMIN_ROUTER.DASHBOARD,
    icon: <LayoutDashboard size={16} />,
    component: React.lazy(() => import("@/pages/admin/dashboard/Dashboard.page")),
    isEnd: true,
  },
  {
    label: "Profile",
    path: ROUTER_URL.ADMIN_ROUTER.PROFILE,
    icon: <UserCircle size={16} />,
    component: React.lazy(() => import("@/pages/admin/auth/profile/Profile.page")),
    isEnd: true,
  },
  {
    label: "Users",
    path: ROUTER_URL.ADMIN_ROUTER.USER,
    icon: <Users size={18} />,
    component: React.lazy(() => import("@/pages/admin/user/User.page")),
  },
  {
    label: "Franchise",
    path: ROUTER_URL.ADMIN_ROUTER.FRANCHISE,
    icon: <Store size={18} />,
    component: React.lazy(() => import("@/pages/admin/franchise/Franchise.page")),
  },
  {
    label: "Categories",
    path: ROUTER_URL.ADMIN_ROUTER.CATEGORY,
    icon: <Tags size={18} />,
    component: React.lazy(() => import("@/pages/admin/category/Category.page")),
  },
  {
    label: "Products",
    path: ROUTER_URL.ADMIN_ROUTER.PRODUCT,
    icon: <Package size={18} />,
    component: React.lazy(() => import("@/pages/admin/product/Product.page")),
  },
  {
    label: "Inventory",
    path: ROUTER_URL.ADMIN_ROUTER.INVENTORY,
    icon: <Warehouse size={18} />,
    component: React.lazy(() => import("@/pages/admin/inventory/Inventory.page")),
  },
  {
    label: "Customers",
    path: ROUTER_URL.ADMIN_ROUTER.CUSTOMER,
    icon: <UserCircle size={18} />,
    component: React.lazy(() => import("@/pages/admin/customer/Customer.page")),
  },
  {
    label: "Orders",
    path: ROUTER_URL.ADMIN_ROUTER.ORDER,
    icon: <ShoppingCart size={18} />,
    component: React.lazy(() => import("@/pages/admin/order/Order.page")),
  },
  {
    label: "Payments",
    path: ROUTER_URL.ADMIN_ROUTER.PAYMENT,
    icon: <CreditCard size={18} />,
    component: React.lazy(() => import("@/pages/admin/payment/Payment.page")),
  },
  {
    label: "Loyalty",
    path: ROUTER_URL.ADMIN_ROUTER.LOYALTY,
    icon: <Gift size={18} />,
    component: React.lazy(() => import("@/pages/admin/loyalty/Loyalty.page")),
  },
];
