import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store, Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
    // Dummy auth — any credentials work
    localStorage.setItem("pos_user", JSON.stringify({ email: form.email, name: "Admin" }));
    navigate("/");
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
              <input
                className="input"
                type="email"
                placeholder="admin@shoppos.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-group">
              <Lock size={16} className="input-icon" />
              <input
                className="input"
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                style={{ paddingRight: 40 }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={styles.eyeBtn}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
            <span style={{ fontSize: "0.85rem", color: "#4f46e5", cursor: "pointer" }}>Forgot password?</span>
          </div>

          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Sign In
          </button>
        </form>

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
    maxWidth: 420,
    boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 28,
  },
  logoIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    background: "#4f46e5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
