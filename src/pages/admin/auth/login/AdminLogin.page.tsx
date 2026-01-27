// src/pages/AdminLogin.page.tsx

import { FAKE_USERS } from "@/consts";
import { ROUTER_URL } from "@/routes/router.const";
import { useAuthStore } from "@/stores/auth.store";
import { showError } from "@/utils";
import { getCurrentUser } from "@/utils/localstorage.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { adminLoginSchema, type AdminLoginFormValues } from "./schema/adminLogin.schema";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const user = getCurrentUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
  });

  useEffect(() => {
    if (user) {
      navigate(`${ROUTER_URL.ADMIN}/${ROUTER_URL.ADMIN_ROUTER.DASHBOARD}`, { replace: true });
    }
  }, [user, navigate]);

  const onSubmit = async (data: AdminLoginFormValues) => {
    const user = FAKE_USERS.find((user) => user.email === data.email);

    // TODO: only for demo, remove in production
    if (!user) {
      showError("User not found! Please check your email again!");
      return;
    }

    // TODO:
    // 1. Call login API
    // 2. Call api get user info
    // 3. Redirect to /admin/dashboard

    login(user);
    navigate(`${ROUTER_URL.ADMIN}/${ROUTER_URL.ADMIN_ROUTER.DASHBOARD}`, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-center mb-6">Admin Login</h1>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="admin@example.com"
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="••••••••"
            />
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center text-xs text-gray-500">© 2026 Your Company</div>
      </div>
    </div>
  );
}
