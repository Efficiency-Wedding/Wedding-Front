import { Suspense, lazy, useState } from "react";
import { Link, Navigate, useLocation, useNavigate, Routes, Route } from "react-router-dom";
import {
  Heart, LayoutDashboard, Sparkles, Package, CalendarCheck,
  PenTool, Mail, Settings as SettingsIcon, ChevronLeft, ChevronRight,
  LogOut, Menu, X,
} from "lucide-react";
import { api, clearAdminSession, isAdminAuthenticated } from "@/shared/api";

const Dashboard   = lazy(() => import("./Dashboard"));
const Services    = lazy(() => import("./Services"));
const Packs       = lazy(() => import("./Packs"));
const Reservations = lazy(() => import("./Reservations"));
const Blog        = lazy(() => import("./Blog"));
const Settings    = lazy(() => import("./Settings"));
const Contacts    = lazy(() => import("./Contacts"));

function AdminRouteFallback() {
  return (
    <div className="flex min-h-[400px] items-center justify-center text-sm text-gray-500">
      Chargement...
    </div>
  );
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAdminAuthenticated()) return <Navigate to="/admin/login" replace />;

  const nav = [
    { id: "dashboard",    path: "/admin",              label: "Tableau de bord", icon: LayoutDashboard },
    { id: "services",     path: "/admin/services",     label: "Services",        icon: Sparkles },
    { id: "packs",        path: "/admin/packs",        label: "Packs",           icon: Package },
    { id: "reservations", path: "/admin/reservations", label: "Réservations",    icon: CalendarCheck },
    { id: "blog",         path: "/admin/blog",         label: "Blog",            icon: PenTool },
    { id: "contacts",     path: "/admin/contacts",     label: "Messages",        icon: Mail },
    { id: "settings",     path: "/admin/settings",     label: "Paramètres",      icon: SettingsIcon },
  ];

  const isActive = (path: string) =>
    path === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(path);

  const handleLogout = () => {
    void (async () => {
      try { await api.adminLogout(); } finally {
        clearAdminSession();
        navigate("/admin/login", { replace: true });
      }
    })();
  };

  const SidebarContent = ({ collapsed }: { collapsed: boolean }) => (
    <>
      {/* Logo */}
      <div className="p-4 border-b border-[#edd694]/20 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 min-w-9 rounded-xl bg-gradient-to-br from-[#fdfbf7] to-[#f5e8c2] flex items-center justify-center border border-[#d4a843]/20">
            <Heart className="text-[#b88a2d] w-4 h-4" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-serif text-sm font-bold text-[#664a24] leading-tight">Mariage MG</h1>
              <p className="text-[10px] text-[#946c25] uppercase tracking-wider">Backoffice</p>
            </div>
          )}
        </div>
        {/* Desktop collapse toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hidden md:flex p-1.5 hover:bg-[#fbf5e6] rounded-lg text-[#946c25]"
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
        {/* Mobile close */}
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden p-1.5 hover:bg-[#fbf5e6] rounded-lg text-[#946c25]"
        >
          <X size={16} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-[#d4a843]/12 text-[#946c25] border-r-4 border-[#d4a843]"
                  : "text-gray-600 hover:bg-[#fdfbf7] hover:text-[#7a5826]"
              }`}
            >
              <Icon size={17} className={active ? "text-[#d4a843]" : "text-gray-400"} />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-[#edd694]/20">
        <div className={`flex items-center gap-3 ${collapsed && "justify-center"}`}>
          <div className="w-8 h-8 min-w-8 rounded-full bg-[#f5e8c2] text-[#946c25] flex items-center justify-center font-semibold text-xs border border-[#d4a843]/20">
            A
          </div>
          {!collapsed && (
            <div className="text-xs overflow-hidden">
              <p className="font-medium text-gray-900 truncate">Admin</p>
              <p className="text-gray-500 truncate">admin@mariage.mg</p>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className={`mt-3 w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-[#fdfbf7] hover:text-[#7a5826] transition-colors ${collapsed ? "justify-center" : ""}`}
        >
          <LogOut size={16} className="text-gray-400" />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </>
  );

  const currentLabel = nav.find((n) => isActive(n.path))?.label ?? "Dashboard";

  return (
    <div className="flex h-screen bg-[#faf7f2] text-gray-800 font-sans overflow-hidden">

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#edd694]/30 flex flex-col transition-transform duration-300 md:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <SidebarContent collapsed={false} />
      </aside>

      {/* Desktop sidebar */}
      <aside className={`hidden md:flex ${sidebarOpen ? "w-60" : "w-[68px]"} bg-white border-r border-[#edd694]/30 flex-col transition-all duration-300 h-screen sticky top-0 shrink-0`}>
        <SidebarContent collapsed={!sidebarOpen} />
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-[#edd694]/25 h-14 flex items-center justify-between px-4 sm:px-6 shadow-sm shrink-0 gap-3">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 hover:bg-[#fbf5e6] rounded-lg text-[#946c25]"
            >
              <Menu size={18} />
            </button>
            <div className="flex items-center gap-1.5 text-xs text-[#946c25]">
              <span className="hidden sm:inline">Admin</span>
              <span className="hidden sm:inline">/</span>
              <span className="font-medium capitalize">{currentLabel}</span>
            </div>
          </div>
          <span className="text-xs text-gray-400 hidden sm:block">
            {new Date().toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </span>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Suspense fallback={<AdminRouteFallback />}>
              <Routes>
                <Route path=""             element={<Dashboard />} />
                <Route path="services"     element={<Services />} />
                <Route path="packs"        element={<Packs />} />
                <Route path="reservations" element={<Reservations />} />
                <Route path="blog"         element={<Blog />} />
                <Route path="contacts"     element={<Contacts />} />
                <Route path="settings"     element={<Settings />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}