import { ADMIN_MENU, type AdminMenuItem } from "@/routes/admin/Admin.menu.tsx";
import { ROUTER_URL } from "@/routes/router.const";
import { NavLink } from "react-router-dom";

interface AdminSidebarProps {
  collapsed?: boolean;
}

export default function AdminSidebar({ collapsed }: AdminSidebarProps) {
  return (
    <aside
      className={`bg-[#2A3F54] text-white flex flex-col transition-all duration-300
        ${collapsed ? "w-16" : "w-64"}`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-white/10 font-semibold">
        {collapsed ? "A" : "Admin Panel"}
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col flex-1 px-4 py-4 space-y-2 text-sm">
        {ADMIN_MENU.map((item) => (
          <SidebarItem key={item.path} item={item} collapsed={!!collapsed} end={item.isEnd} />
        ))}
      </nav>
      {/* <div className="p-4 border-t border-white/10 text-xs text-white/60">© 2026 Your Company</div> */}
    </aside>
  );
}

interface SidebarItemProps {
  item: AdminMenuItem;
  collapsed: boolean;
}

function SidebarItem({ item, collapsed }: SidebarItemProps & { end?: boolean }) {
  return (
    <NavLink
      to={`${ROUTER_URL.ADMIN}/${item.path}`}
      end={item.isEnd}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded transition
         ${isActive ? "bg-white/20 font-semibold" : "hover:bg-white/10"}`
      }
    >
      <span className="min-w-5 flex justify-center">{item.icon}</span>
      {!collapsed && <span>{item.label}</span>}
    </NavLink>
  );
}
