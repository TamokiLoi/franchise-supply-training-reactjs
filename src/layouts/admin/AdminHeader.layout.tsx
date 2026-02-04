import { HttpError } from "@/api/http.types";
import { logoutUseCase } from "@/features";
import { ROUTER_URL } from "@/routes/router.const";
import { useAuthStore, useLoadingStore } from "@/stores";
import { showError, showSuccess } from "@/utils";
import { LogOut, Menu, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
}

export default function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const setLoading = useLoadingStore((s) => s.setLoading);

  const onLogout = async () => {
    setLoading(true);
    try {
      await logoutUseCase();
      navigate(ROUTER_URL.ADMIN_ROUTER.LOGIN, { replace: true });
    } catch (err) {
      if (err instanceof HttpError) {
        showError(err.message);
        return;
      }
      showError("Logout failed. Please try again.");
    } finally {
      showSuccess("Logout successful!");
      setLoading(false);
    }
  };

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <Menu className="w-5 h-5 text-slate-600 cursor-pointer" onClick={onToggleSidebar} />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* User dropdown */}
        <div className="relative group">
          <div className="flex items-center gap-2 cursor-pointer select-none">
            <span className="text-sm font-medium">{user?.email ?? "Admin"}</span>
            <User className="w-6 h-6 text-slate-600" />
          </div>

          {/* Dropdown */}
          <div
            className="absolute right-0 top-10 w-48 bg-white border rounded-md shadow-md 
                          opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                          transition-all duration-150"
          >
            <button
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
              onClick={() => navigate(ROUTER_URL.ADMIN_ROUTER.PROFILE)}
            >
              User detail
            </button>

            <button
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
