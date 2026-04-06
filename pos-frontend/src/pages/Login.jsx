import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store, Eye, EyeOff, Lock, Mail, ChevronDown, ChevronUp } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [showHint, setShowHint] = useState(false);

  const roleHome = { admin: "/", manager: "/pos", cashier: "/pos" };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
    const result = login(form.email, form.password);
    if (!result.success) { setError(result.message); return; }
    navigate(roleHome[result.user.role] || "/pos");
  };

  const fillDemo = (email, password) => {
    setForm({ email, password });
    setError("");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}><Store size={28} color="#fff" /></div>
          <h1 style={styles.logoText}>ShopPOS</h1>
        </div>

        <h2 style={styles.title}>Welcome back</h2>
        <p style={styles.subtitle}>Sign in to your account</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <div className="input-group">
              <Mail size={16} className="input-icon" />
              <input className="input" type="email" placeholder="your@email.com"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-group">
              <Lock size={16} className="input-icon" />
              <input className="input" type={showPass ? "text" : "password"} placeholder="Enter your password"
                value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                style={{ paddingRight: 40 }} />
              <button type="button" onClick={() => setShowPass(!showPass)} style={styles.eyeBtn}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg btn-block" style={{ marginBottom: 16 }}>
            Sign In
          </button>
        </form>

        {/* Demo credentials hint */}
        <div style={styles.hintBox}>
          <button style={styles.hintToggle} onClick={() => setShowHint(!showHint)}>
            Demo accounts {showHint ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          {showHint && (
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                { label: "Admin",   email: "admin@gmail.com",   password: "admin123",   color: "#4f46e5" },
                { label: "Manager", email: "manager@gmail.com", password: "manager123", color: "#10b981" },
                { label: "Cashier", email: "cashier@gmail.com", password: "cashier123", color: "#2563eb" },
              ].map(({ label, email, password, color }) => (
                <button key={label} style={{ ...styles.demoBtn, borderColor: color, color }}
                  onClick={() => fillDemo(email, password)}>
                  <span style={{ fontWeight: 700 }}>{label}</span>
                  <span style={{ opacity: 0.7, fontSize: "0.78rem" }}>{email}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <p style={styles.switchText}>
          Don't have an account?{" "}
          <Link to="/signup" style={styles.link}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1e1b4b 0%, #4f46e5 100%)",
    display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
  },
  card: {
    background: "#fff", borderRadius: 20, padding: "40px 36px",
    width: "100%", maxWidth: 420, boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
  },
  logo: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 28 },
  logoIcon: { width: 48, height: 48, borderRadius: 12, background: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center" },
  logoText: { fontSize: "1.5rem", fontWeight: 800, color: "#1e1b4b" },
  title: { fontSize: "1.4rem", fontWeight: 700, textAlign: "center", marginBottom: 6 },
  subtitle: { fontSize: "0.875rem", color: "#6b7280", textAlign: "center", marginBottom: 24 },
  error: { background: "#fee2e2", color: "#991b1b", padding: "10px 14px", borderRadius: 8, fontSize: "0.85rem", marginBottom: 16 },
  eyeBtn: { position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: 4 },
  hintBox: { background: "#f9fafb", borderRadius: 10, padding: "10px 14px", marginBottom: 16, border: "1px solid #e5e7eb" },
  hintToggle: { background: "none", border: "none", cursor: "pointer", fontSize: "0.82rem", color: "#6b7280", display: "flex", alignItems: "center", gap: 4, width: "100%" },
  demoBtn: { background: "none", border: "1px solid", borderRadius: 8, padding: "7px 12px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.2s" },
  switchText: { textAlign: "center", marginTop: 8, fontSize: "0.875rem", color: "#6b7280" },
  link: { color: "#4f46e5", fontWeight: 600, textDecoration: "none" },
};
