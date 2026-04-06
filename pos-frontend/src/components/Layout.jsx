import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, ShoppingCart, Package, Warehouse,
  Users, BarChart2, Store, LogOut, Sun, Moon, UserCog, ChevronRight
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth, canAccess } from "../context/AuthContext";

const allNavItems = [
  { path: "/",          label: "Dashboard", icon: LayoutDashboard, page: "dashboard" },
  { path: "/pos",       label: "Sales / POS", icon: ShoppingCart,  page: "pos"       },
  { path: "/products",  label: "Products",    icon: Package,        page: "products"  },
  { path: "/inventory", label: "Inventory",   icon: Warehouse,      page: "inventory" },
  { path: "/customers", label: "Customers",   icon: Users,          page: "customers" },
  { path: "/reports",   label: "Reports",     icon: BarChart2,      page: "reports"   },
  { path: "/users",     label: "Users",       icon: UserCog,        page: "users"     },
];

const pageTitles = {
  "/": "Dashboard", "/pos": "Point of Sale", "/products": "Product Management",
  "/inventory": "Inventory", "/customers": "Customers",
  "/reports": "Reports", "/users": "User Management", "/profile": "My Profile",
};

const roleBadge = {
  admin:   { label: "Admin",   bg: "#edf0f5", color: "#4a5568" },
  manager: { label: "Manager", bg: "#e6f0ee", color: "#3a6b5f" },
  cashier: { label: "Cashier", bg: "#e8edf5", color: "#3a5278" },
};

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();
  const title = pageTitles[location.pathname] || "POS System";

  const navItems = allNavItems.filter(item => canAccess(user?.role, item.page));
  const badge = roleBadge[user?.role] || roleBadge.cashier;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <Store size={22} />
          <span>ShopPOS</span>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User info at bottom of sidebar — click to go to profile */}
        <div
          onClick={() => navigate("/profile")}
          style={{
            padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.1)",
            cursor: "pointer", transition: "background 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          title="View profile"
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%", background: badge.bg,
              color: badge.color, display: "flex", alignItems: "center",
              justifyContent: "center", fontWeight: 700, fontSize: "0.85rem", flexShrink: 0
            }}>
              {(user?.name || "U").charAt(0).toUpperCase()}
            </div>
            <div style={{ overflow: "hidden", flex: 1 }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {user?.name}
              </div>
              <span style={{ fontSize: "0.72rem", padding: "1px 8px", borderRadius: 10, background: badge.bg, color: badge.color, fontWeight: 700, textTransform: "capitalize" }}>
                {badge.label}
              </span>
            </div>
            <ChevronRight size={14} color="rgba(255,255,255,0.3)" />
          </div>
        </div>
      </aside>

      <div className="main-content">
        <header className="topbar">
          <span className="topbar-title">{title}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button className="theme-toggle" onClick={toggle} title="Toggle theme">
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={handleLogout} className="btn btn-outline btn-sm">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </header>
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}
