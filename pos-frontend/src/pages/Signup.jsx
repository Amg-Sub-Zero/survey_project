import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store, Eye, EyeOff, Lock, Mail, User, Building2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", storeName: "", email: "", password: "", confirm: "", role: "cashier" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError("Please fill in all required fields."); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    // Save and auto-login
    const newUser = { id: Date.now(), name: form.name, email: form.email, role: form.role, storeName: form.storeName };
    localStorage.setItem("pos_user", JSON.stringify(newUser));
    const roleHome = { admin: "/", manager: "/pos", cashier: "/pos" };
    navigate(roleHome[form.role] || "/pos");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}><Store size={28} color="#fff" /></div>
          <h1 style={styles.logoText}>ShopPOS</h1>
        </div>

        <h2 style={styles.title}>Create account</h2>
        <p style={styles.subtitle}>Get started with your POS system</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <div className="input-group">
                <User size={16} className="input-icon" />
                <input className="input" placeholder="John Doe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Store Name</label>
              <div className="input-group">
                <Building2 size={16} className="input-icon" />
                <input className="input" placeholder="My Shop" value={form.storeName} onChange={e => setForm({ ...form, storeName: e.target.value })} />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email *</label>
            <div className="input-group">
              <Mail size={16} className="input-icon" />
              <input className="input" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Password *</label>
              <div className="input-group">
                <Lock size={16} className="input-icon" />
                <input
                  className="input"
                  type={showPass ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  style={{ paddingRight: 40 }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={styles.eyeBtn}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password *</label>
              <div className="input-group">
                <Lock size={16} className="input-icon" />
                <input
                  className="input"
                  type={showPass ? "text" : "password"}
                  placeholder="Repeat password"
                  value={form.confirm}
                  onChange={e => setForm({ ...form, confirm: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
              <label className="form-label">Role</label>
              <select className="input" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                <option value="cashier">Cashier — POS only</option>
                <option value="manager">Manager — Products & Reports</option>
                <option value="admin">Administrator — Full access</option>
              </select>
            </div>

          <button type="submit" className="btn btn-primary btn-lg btn-block" style={{ marginTop: 8 }}>
            Create Account
          </button>
        </form>

        <p style={styles.switchText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1e1b4b 0%, #4f46e5 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  card: {
    background: "#fff",
    borderRadius: 20,
    padding: "40px 36px",
    width: "100%",
    maxWidth: 520,
    boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
  },
  logo: {
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: 10, marginBottom: 28,
  },
  logoIcon: {
    width: 48, height: 48, borderRadius: 12, background: "#4f46e5",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  logoText: { fontSize: "1.5rem", fontWeight: 800, color: "#1e1b4b" },
  title: { fontSize: "1.4rem", fontWeight: 700, textAlign: "center", marginBottom: 6 },
  subtitle: { fontSize: "0.875rem", color: "#6b7280", textAlign: "center", marginBottom: 24 },
  error: {
    background: "#fee2e2", color: "#991b1b", padding: "10px 14px",
    borderRadius: 8, fontSize: "0.85rem", marginBottom: 16,
  },
  eyeBtn: {
    position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
    background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: 4,
  },
  switchText: { textAlign: "center", marginTop: 24, fontSize: "0.875rem", color: "#6b7280" },
  link: { color: "#4f46e5", fontWeight: 600, textDecoration: "none" },
};
