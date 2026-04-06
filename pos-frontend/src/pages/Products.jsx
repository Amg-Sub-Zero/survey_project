import { useState } from "react";
import { Plus, Search, Edit2, Trash2, X } from "lucide-react";
import { products as initialProducts } from "../data/dummyData";

const emptyForm = { name: "", category: "", price: "", quantity: "", barcode: "" };
const categories = ["Beverages", "Bakery", "Dairy", "Grains", "Meat", "Condiments", "Other"];

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.barcode.includes(search)
  );

  const openAdd = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (p) => { setEditing(p.id); setForm({ name: p.name, category: p.category, price: p.price, quantity: p.quantity, barcode: p.barcode }); setShowModal(true); };

  const handleSave = () => {
    if (!form.name || !form.price) return;
    if (editing) {
      setProducts(prev => prev.map(p => p.id === editing ? { ...p, ...form, price: Number(form.price), quantity: Number(form.quantity) } : p));
    } else {
      setProducts(prev => [...prev, { ...form, id: Date.now(), price: Number(form.price), quantity: Number(form.quantity), status: "In Stock" }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div className="input-group" style={{ width: 300 }}>
          <Search size={16} className="input-icon" />
          <input className="input" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Barcode</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.id}>
                  <td style={{ color: "#9ca3af" }}>{i + 1}</td>
                  <td style={{ fontWeight: 600 }}>{p.name}</td>
                  <td><span className="badge badge-info">{p.category}</span></td>
                  <td>${Number(p.price).toFixed(2)}</td>
                  <td>{p.quantity}</td>
                  <td style={{ fontFamily: "monospace", fontSize: "0.8rem" }}>{p.barcode}</td>
                  <td>
                    <span className={`badge ${p.quantity === 0 ? "badge-danger" : p.quantity <= 8 ? "badge-warning" : "badge-success"}`}>
                      {p.quantity === 0 ? "Out of Stock" : p.quantity <= 8 ? "Low Stock" : "In Stock"}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn btn-outline btn-sm" onClick={() => openEdit(p)}><Edit2 size={13} /></button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <span className="modal-title">{editing ? "Edit Product" : "Add Product"}</span>
              <button className="modal-close" onClick={() => setShowModal(false)}><X size={18} /></button>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Product Name *</label>
                <input className="input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Coca Cola 500ml" />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  <option value="">Select category</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Price ($) *</label>
                <input className="input" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="0.00" />
              </div>
              <div className="form-group">
                <label className="form-label">Quantity</label>
                <input className="input" type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} placeholder="0" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Barcode</label>
              <input className="input" value={form.barcode} onChange={e => setForm({ ...form, barcode: e.target.value })} placeholder="e.g. 1234567890123" />
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <button className="btn btn-outline btn-block" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary btn-block" onClick={handleSave}>
                {editing ? "Save Changes" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
