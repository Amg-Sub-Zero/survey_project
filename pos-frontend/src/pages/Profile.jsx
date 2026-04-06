import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Shield, Building2, Lock, Eye, EyeOff, Check } from "lucide-react";

const roleBadge = {
  admin:   { label: "Administrator", bg: "#edf0f5", color: "#4a5568", desc: "Full system access" },
  manager: { label: "Manager",       bg: "#e6f0ee", color: "#3a6b5f", desc: "Products & Reports access" },
  cashier: { label: "Cashier",       bg: "#e8edf5", color: "#3a5278", desc: "POS screen only" },
};

export default function Profile() {
  const { user } = useAuth();
  const badge = roleBadge[user?.role] || roleBadge.cashier;

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    storeName: user?.storeName || "",
  });
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pwError, setPwError] = useState("");
  const [pwSaved, setPwSaved] = useState(false);

  const handleSaveInfo = (e) => {
    e.preventDefault();
    const updated = { ...user, ...form };
    localStorage.setItem("pos_user", JSON.stringify(updated));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPwError("");
    if (!passwords.current) { setPwError("Enter your current password."); return; }
    if (passwords.newPass.length < 6) { setPwError("New password must be at least 6 characters."); return; }
    if (passwords.newPass !== passwords.confirm) { setPwError("Passwords do not match."); return; }
    setPasswords({ current: "", newPass: "", confirm: "" });
    setPwSaved(true);
    setTimeout(() => setPwSaved(false), 2500);
  };

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>

      {/* Profile header card */}
      <div className="card" style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          background: badge.bg, color: badge.color,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, fontSize: "1.8rem", flexShrink: 0,
          border: `3px solid ${badge.color}22`
        }}>
          {(user?.name || "U").charAt(0).toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontWeight: 700, fontSize: "1.2rem", color: "var(--text)" }}>{user?.name}</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: 8 }}>{user?.email}</p>
          <span style={{
            padding: "3px 14px", borderRadius: 20, fontSize: "0.78rem",
            fontWeight: 700, background: badge.bg, color: badge.color
          }}>
            {badge.label} · {badge.desc}
          </span>
        </div>
        {user?.storeName && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-muted)", fontSize: "0.85rem" }}>
            <Building2 size={15} />
            {user.storeName}
          </div>
        )}
      </div>

      {/* Edit info */}
      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ fontWeight: 700, marginBottom: 18, color: "var(--text)", display: "flex", alignItems: "center", gap: 8 }}>
          <User size={17} /> Personal Information
        </h3>
        <form onSubmit={handleSaveInfo}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-group">
                <User size={15} className="input-icon" />
                <input className="input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Store Name</label>
              <div className="input-group">
                <Building2 size={15} className="input-icon" />
                <input className="input" value={form.storeName} onChange={e => setForm({ ...form, storeName: e.target.value })} placeholder="Store name" />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <div className="input-group">
              <Mail size={15} className="input-icon" />
              <input className="input" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Role</label>
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "9px 12px", borderRadius: 8, border: "1px solid var(--border)",
              background: "var(--surface-2)"
            }}>
              <Shield size={15} color={badge.color} />
              <span style={{ fontSize: "0.875rem", color: badge.color, fontWeight: 600, textTransform: "capitalize" }}>
                {user?.role}
              </span>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginLeft: 4 }}>
                — {badge.desc}
              </span>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ minWidth: 140 }}>
            {saved ? <><Check size={15} /> Saved</> : "Save Changes"}
          </button>
        </form>
      </div>

      {/* Change password */}
      <div className="card">
        <h3 style={{ fontWeight: 700, marginBottom: 18, color: "var(--text)", display: "flex", alignItems: "center", gap: 8 }}>
          <Lock size={17} /> Change Password
        </h3>
        <form onSubmit={handleChangePassword}>
          {pwError && (
            <div style={{ background: "#faeaea", color: "#8b2a2a", padding: "8px 12px", borderRadius: 8, marginBottom: 14, fontSize: "0.85rem" }}>
              {pwError}
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Current Password</label>
            <div className="input-group">
              <Lock size={15} className="input-icon" />
              <input
                className="input" type={showPass ? "text" : "password"}
                value={passwords.current} placeholder="Current password"
                onChange={e => setPasswords({ ...passwords, current: e.target.value })}
                style={{ paddingRight: 40 }}
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">New Password</label>
              <div className="input-group">
                <Lock size={15} className="input-icon" />
                <input className="input" type={showPass ? "text" : "password"}
                  value={passwords.newPass} placeholder="Min. 6 characters"
                  onChange={e => setPasswords({ ...passwords, newPass: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <div className="input-group">
                <Lock size={15} className="input-icon" />
                <input className="input" type={showPass ? "text" : "password"}
                  value={passwords.confirm} placeholder="Repeat new password"
                  onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ minWidth: 160 }}>
            {pwSaved ? <><Check size={15} /> Password Updated</> : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
