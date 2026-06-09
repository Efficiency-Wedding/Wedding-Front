import { Suspense, lazy, useState } from "react";
import { Link, Navigate, useLocation, useNavigate, Routes, Route } from "react-router-dom";
import {
  Heart,
  LayoutDashboard,
  Sparkles,
  Package,
  CalendarCheck,
  PenTool,
  Settings as SettingsIcon,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { api, clearAdminSession, isAdminAuthenticated } from "@/shared/api";

const Dashboard = lazy(() => import("./Dashboard"));
const Services = lazy(() => import("./Services"));
const Packs = lazy(() => import("./Packs"));
const Reservations = lazy(() => import("./Reservations"));
const Blog = lazy(() => import("./Blog"));
const Settings = lazy(() => import("./Settings"));

function AdminRouteFallback() {
  return (
    <div className="flex min-h-[400px] items-center justify-center text-sm text-gray-500">
      Chargement du backoffice...
    </div>
  );
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  const nav = [
    {
      id: "dashboard",
      path: "/admin",
      label: "Tableau de bord",
      icon: LayoutDashboard,
    },
    {
      id: "services",
      path: "/admin/services",
      label: "Services",
      icon: Sparkles,
    },
    { id: "packs", path: "/admin/packs", label: "Packs", icon: Package },
    {
      id: "reservations",
      path: "/admin/reservations",
      label: "Réservations",
      icon: CalendarCheck,
    },
    { id: "blog", path: "/admin/blog", label: "Blog", icon: PenTool },
    {
      id: "settings",
      path: "/admin/settings",
      label: "Paramètres",
      icon: SettingsIcon,
    },
  ];

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    void (async () => {
      try {
        await api.adminLogout();
      } finally {
        clearAdminSession();
        navigate("/admin/login", { replace: true });
      }
    })();
  };

  return (
    <div className="flex h-screen bg-[#faf7f2] text-gray-800 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-[#edd694]/30 flex flex-col transition-all duration-300 h-screen sticky top-0`}
      >
        <div className="p-5 border-b border-[#edd694]/20 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 min-w-10 rounded-xl bg-gradient-to-br from-[#fdfbf7] to-[#f5e8c2] flex items-center justify-center shadow-sm border border-[#d4a843]/20">
              <Heart className="text-[#b88a2d] w-5 h-5" />
            </div>
            {sidebarOpen && (
              <div className="animate-fade-in">
                <h1 className="font-serif text-base font-bold text-[#664a24] leading-tight whitespace-nowrap">
                  Mariage MG
                </h1>
                <p className="text-[10px] text-[#946c25] font-medium uppercase tracking-wider">
                  Backoffice Admin
                </p>
              </div>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 hover:bg-[#fbf5e6] rounded-lg transition-colors text-[#946c25]"
          >
            {sidebarOpen ? (
              <ChevronLeft size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {nav.map((item) => {
            const IconComponent = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-[#d4a843]/12 text-[#946c25] border-r-4 border-[#d4a843]"
                    : "text-gray-600 hover:bg-[#fdfbf7] hover:text-[#7a5826]"
                }`}
              >
                <IconComponent
                  size={18}
                  className={active ? "text-[#d4a843]" : "text-gray-400"}
                />
                {sidebarOpen && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#edd694]/20">
          <div
            className={`flex items-center gap-3 ${!sidebarOpen && "justify-center"}`}
          >
            <div className="w-9 h-9 min-w-9 rounded-full bg-[#f5e8c2] text-[#946c25] flex items-center justify-center font-semibold text-sm border border-[#d4a843]/20">
              A
            </div>
            {sidebarOpen && (
              <div className="text-xs overflow-hidden">
                <p className="font-medium text-gray-900 truncate">Admin</p>
                <p className="text-gray-500 truncate">admin@mariage.mg</p>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className={`mt-4 w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-[#fdfbf7] hover:text-[#7a5826] ${
              !sidebarOpen ? "justify-center" : ""
            }`}
            title="Deconnexion"
          >
            <LogOut size={17} className="text-gray-400" />
            {sidebarOpen && <span>Deconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-[#edd694]/25 h-16 flex items-center justify-between px-8 shadow-sm shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#946c25]">
            <span>Admin</span>
            <span>/</span>
            <span className="capitalize font-medium">
              {location.pathname.split("/").pop() || "Tableau de bord"}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400">
              {new Date().toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </header>

        {/* Dynamic Page Routes */}
        <div className="flex-1 overflow-y-auto p-8 max-w-7xl w-full mx-auto">
          <Suspense fallback={<AdminRouteFallback />}>
            <Routes>
              <Route path="" element={<Dashboard />} />
              <Route path="services" element={<Services />} />
              <Route path="packs" element={<Packs />} />
              <Route path="reservations" element={<Reservations />} />
              <Route path="blog" element={<Blog />} />
              <Route path="settings" element={<Settings />} />
            </Routes>
          </Suspense>
        </div>
      </main>
    </div>
  );
}
