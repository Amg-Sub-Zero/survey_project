import { useState } from "react";
import { Plus, X, Shield, BarChart2, ShoppingCart } from "lucide-react";
import { DUMMY_USERS } from "../context/AuthContext";

const roleColors = {
  admin:   { bg: "#edf0f5", color: "#4a5568", icon: Shield },
  manager: { bg: "#e6f2ef", color: "#3a6b5f", icon: BarChart2 },
  cashier: { bg: "#e8edf5", color: "#3a5278", icon: ShoppingCart },
};

const emptyForm = { name: "", email: "", password: "", role: "cashier" };

export default function Users() {
  const [users, setUsers] = useState(DUMMY_USERS.map(({ password: _, ...u }) => u));
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (!form.name || !form.email || !form.password) { setError("All fields are required."); return; }
    setUsers(prev => [...prev, { ...form, id: Date.now() }]);
    setShowModal(false);
    setForm(emptyForm);
    setError("");
  };

  const handleRemove = (id) => {
    if (window.confirm("Remove this user?")) setUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontWeight: 700, color: "var(--text)" }}>Staff Accounts</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: 2 }}>Manage who can access the system and what they can do</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setShowModal(true); setError(""); }}>
          <Plus size={16} /> Add User
        </button>
      </div>

      {/* Role legend */}
      <div className="grid-3" style={{ marginBottom: 24 }}>
        {Object.entries(roleColors).map(([role, { bg, color, icon: Icon }]) => (
          <div className="card" key={role} style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon size={20} color={color} />
            </div>
            <div>
              <div style={{ fontWeight: 700, textTransform: "capitalize", color: "var(--text)" }}>{role}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                {role === "admin" ? "Full access" : role === "manager" ? "Products & Reports" : "POS only"}
              </div>
            </div>
            <div style={{ marginLeft: "auto", fontWeight: 700, fontSize: "1.3rem", color }}>
              {users.filter(u => u.role === role).length}
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Permissions</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => {
                const { bg, color } = roleColors[u.role] || roleColors.cashier;
                return (
                  <tr key={u.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                          width: 34, height: 34, borderRadius: "50%",
                          background: bg, color, fontWeight: 700,
                          display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem"
                        }}>
                          {u.name.charAt(0)}
                        </div>
                        <span style={{ fontWeight: 600 }}>{u.name}</span>
                      </div>
                    </td>
                    <td style={{ color: "var(--text-muted)" }}>{u.email}</td>
                    <td>
                      <span style={{
                        padding: "3px 12px", borderRadius: 20, fontSize: "0.78rem",
                        fontWeight: 700, background: bg, color, textTransform: "capitalize"
                      }}>{u.role}</span>
                    </td>
                    <td style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      {u.role === "admin"   && "Dashboard · POS · Products · Inventory · Customers · Reports · Users"}
                      {u.role === "manager" && "POS · Products · Inventory · Reports"}
                      {u.role === "cashier" && "POS only"}
                    </td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleRemove(u.id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: 440 }}>
            <div className="modal-header">
              <span className="modal-title">Add Staff Account</span>
              <button className="modal-close" onClick={() => setShowModal(false)}><X size={18} /></button>
            </div>

            {error && <div style={{ background: "#fee2e2", color: "#991b1b", padding: "8px 12px", borderRadius: 8, marginBottom: 14, fontSize: "0.85rem" }}>{error}</div>}

            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input className="input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. John Doe" />
            </div>
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input className="input" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="john@shoppos.com" />
            </div>
            <div className="form-group">
              <label className="form-label">Password *</label>
              <input className="input" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Min. 6 characters" />
            </div>
            <div className="form-group">
              <label className="form-label">Role *</label>
              <select className="input" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                <option value="cashier">Cashier — POS only</option>
                <option value="manager">Manager — Products & Reports</option>
                <option value="admin">Administrator — Full access</option>
              </select>
            </div>

            {/* Role preview */}
            <div style={{ background: "var(--surface-2)", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: "0.82rem", color: "var(--text-muted)" }}>
              <strong style={{ color: "var(--text)" }}>Access preview: </strong>
              {form.role === "admin"   && "Full system access including user management"}
              {form.role === "manager" && "POS · Products · Inventory · Reports (no user management)"}
              {form.role === "cashier" && "POS screen only — no admin features"}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-outline btn-block" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary btn-block" onClick={handleAdd}>Add User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
