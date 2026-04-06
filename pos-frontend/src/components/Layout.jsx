import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, ShoppingCart, Package, Warehouse,
  Users, BarChart2, Store, LogOut
} from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/pos", label: "Sales / POS", icon: ShoppingCart },
  { path: "/products", label: "Products", icon: Package },
  { path: "/inventory", label: "Inventory", icon: Warehouse },
  { path: "/customers", label: "Customers", icon: Users },
  { path: "/reports", label: "Reports", icon: BarChart2 },
];

const pageTitles = {
  "/": "Dashboard",
  "/pos": "Point of Sale",
  "/products": "Product Management",
  "/inventory": "Inventory",
  "/customers": "Customers",
  "/reports": "Reports",
};

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const title = pageTitles[location.pathname] || "POS System";
  const user = JSON.parse(localStorage.getItem("pos_user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("pos_user");
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
      </aside>

      <div className="main-content">
        <header className="topbar">
          <span className="topbar-title">{title}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: "0.85rem", color: "#6b7280" }}>
              Mon, Apr 6, 2026
            </span>
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: "#4f46e5", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, fontSize: "0.85rem"
            }}>{(user.name || "A").charAt(0).toUpperCase()}</div>
            <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>{user.name || "Admin"}</span>
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-sm"
              style={{ display: "flex", alignItems: "center", gap: 5 }}
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </header>
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}
