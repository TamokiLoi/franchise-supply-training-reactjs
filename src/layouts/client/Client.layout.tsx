import { Outlet } from "react-router-dom";
import ClientHeader from "./ClientHeader.layout";
import ClientFooter from "./ClientFooter.layout";

export default function ClientLayout() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] text-slate-800 flex flex-col">
      {/* Header */}
      <ClientHeader />

      {/* Main content */}
      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>

      {/* Footer */}
      <ClientFooter />
    </div>
  );
}
