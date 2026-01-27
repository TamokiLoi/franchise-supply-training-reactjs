import { Bell, Menu, User } from "lucide-react";

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
}

export default function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <Menu className="w-5 h-5 text-slate-600 cursor-pointer" onClick={onToggleSidebar} />
      </div>

      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5 text-slate-600" />
        <div className="flex items-center gap-2 cursor-pointer">
          <User className="w-6 h-6 text-slate-600" />
          {/* TODO: load user */}
          <span className="text-sm">Admin</span>
        </div>
      </div>
    </header>
  );
}
