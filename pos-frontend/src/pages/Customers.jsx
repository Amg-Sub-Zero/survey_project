import { useState } from "react";
import { Plus, Search, Edit2, Trash2, X, Star } from "lucide-react";
import { customers as initialCustomers } from "../data/dummyData";

const emptyForm = { name: "", phone: "", email: "", loyaltyPoints: 0 };

export default function Customers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (c) => { setEditing(c.id); setForm({ name: c.name, phone: c.phone, email: c.email, loyaltyPoints: c.loyaltyPoints }); setShowModal(true); };

  const handleSave = () => {
    if (!form.name) return;
    if (editing) {
      setCustomers(prev => prev.map(c => c.id === editing ? { ...c, ...form } : c));
    } else {
      setCustomers(prev => [...prev, { ...form, id: Date.now(), loyaltyPoints: 0 }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Remove this customer?")) setCustomers(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div className="input-group" style={{ width: 300 }}>
          <Search size={16} className="input-icon" />
          <input className="input" placeholder="Search customers..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          <Plus size={16} /> Add Customer
        </button>
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        {filtered.map(c => (
          <div className="card" key={c.id} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%", background: "#ede9fe",
              color: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, fontSize: "1.1rem", flexShrink: 0
            }}>
              {c.name.charAt(0)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700 }}>{c.name}</div>
              <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>{c.phone} · {c.email}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                <Star size={13} color="#f59e0b" fill="#f59e0b" />
                <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#f59e0b" }}>{c.loyaltyPoints} pts</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn btn-outline btn-sm" onClick={() => openEdit(c)}><Edit2 size={13} /></button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.id)}><Trash2 size={13} /></button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <span className="modal-title">{editing ? "Edit Customer" : "Add Customer"}</span>
              <button className="modal-close" onClick={() => setShowModal(false)}><X size={18} /></button>
            </div>

            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input className="input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. John Doe" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input className="input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="07XXXXXXXX" />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="input" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Loyalty Points</label>
              <input className="input" type="number" value={form.loyaltyPoints} onChange={e => setForm({ ...form, loyaltyPoints: Number(e.target.value) })} />
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <button className="btn btn-outline btn-block" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary btn-block" onClick={handleSave}>
                {editing ? "Save Changes" : "Add Customer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
