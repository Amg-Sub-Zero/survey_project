import { useNavigate } from "react-router-dom";
import { ShieldOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const roleHome = { admin: "/", manager: "/pos", cashier: "/pos" };

export default function Unauthorized() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: "var(--bg)", flexDirection: "column", gap: 16
    }}>
      <div style={{
        width: 72, height: 72, borderRadius: "50%", background: "#fee2e2",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <ShieldOff size={34} color="#ef4444" />
      </div>
      <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)" }}>Access Denied</h2>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
        Your role <strong>({user?.role})</strong> doesn't have permission to view this page.
      </p>
      <button
        className="btn btn-primary"
        onClick={() => navigate(roleHome[user?.role] || "/pos")}
      >
        Go to my dashboard
      </button>
    </div>
  );
}
