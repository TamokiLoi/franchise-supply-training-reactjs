import { HttpError } from "@/api/http.types";
import { fetchAuthUserUseCase } from "@/features";
import { ROUTER_URL } from "@/routes/router.const";
import { useLoadingStore } from "@/stores";
import { showError, showSuccess } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { adminLoginSchema, type AdminLoginFormValues } from "./schema/adminLogin.schema";
import { loginUseCase } from "./usecases";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const setLoading = useLoadingStore((s) => s.setLoading);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginFormValues>({
    defaultValues: {
      email: "tamoki1110@gmail.com",
      password: "12345678",
    },
    resolver: zodResolver(adminLoginSchema),
  });

  const onLogin = async (data: AdminLoginFormValues) => {
    setLoading(true);
    try {
      // 1. authenticate
      await loginUseCase(data);

      // 2. fetch auth user
      await fetchAuthUserUseCase();

      // 3. redirect
      navigate(ROUTER_URL.ADMIN, { replace: true });
    } catch (err) {
      if (err instanceof HttpError) {
        showError(err.message);
        return;
      }
      showError("Login failed. Please try again.");
    } finally {
      showSuccess("Login successful!");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-center mb-6">Admin Login</h1>

        {/* Form */}
        <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
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
