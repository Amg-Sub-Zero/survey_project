import { useState } from "react";
import { Search, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { products } from "../data/dummyData";

const MAX_STOCK = 150;

export default function Inventory() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    if (filter === "low") return matchSearch && p.quantity > 0 && p.quantity <= 10;
    if (filter === "out") return matchSearch && p.quantity === 0;
    if (filter === "ok") return matchSearch && p.quantity > 10;
    return matchSearch;
  });

  const inStock = products.filter(p => p.quantity > 10).length;
  const lowStock = products.filter(p => p.quantity > 0 && p.quantity <= 10).length;
  const outOfStock = products.filter(p => p.quantity === 0).length;

  return (
    <div>
      <div className="grid-3" style={{ marginBottom: 24 }}>
        <div className="stat-card" style={{ cursor: "pointer" }} onClick={() => setFilter("ok")}>
          <div className="stat-icon" style={{ background: "#e6f2ef" }}>
            <CheckCircle size={22} color="#4a7c6f" />
          </div>
          <div className="stat-info">
            <h3>{inStock}</h3>
            <p>In Stock</p>
          </div>
        </div>
        <div className="stat-card" style={{ cursor: "pointer" }} onClick={() => setFilter("low")}>
          <div className="stat-icon" style={{ background: "#f5ede0" }}>
            <AlertTriangle size={22} color="#b07d3a" />
          </div>
          <div className="stat-info">
            <h3>{lowStock}</h3>
            <p>Low Stock</p>
          </div>
        </div>
        <div className="stat-card" style={{ cursor: "pointer" }} onClick={() => setFilter("out")}>
          <div className="stat-icon" style={{ background: "#faeaea" }}>
            <XCircle size={22} color="#c0392b" />
          </div>
          <div className="stat-info">
            <h3>{outOfStock}</h3>
            <p>Out of Stock</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
          <div className="input-group" style={{ flex: 1, minWidth: 200 }}>
            <Search size={16} className="input-icon" />
            <input className="input" placeholder="Search inventory..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["all", "ok", "low", "out"].map(f => (
              <button
                key={f}
                className={`btn ${filter === f ? "btn-primary" : "btn-outline"} btn-sm`}
                onClick={() => setFilter(f)}
              >
                {f === "all" ? "All" : f === "ok" ? "In Stock" : f === "low" ? "Low Stock" : "Out of Stock"}
              </button>
            ))}
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Stock Level</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const pct = Math.min((p.quantity / MAX_STOCK) * 100, 100);
                const color = p.quantity === 0 ? "#c0392b" : p.quantity <= 10 ? "#b07d3a" : "#4a7c6f";
                return (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 600 }}>{p.name}</td>
                    <td><span className="badge badge-info">{p.category}</span></td>
                    <td style={{ fontWeight: 700 }}>{p.quantity}</td>
                    <td style={{ minWidth: 160 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div className="stock-bar" style={{ flex: 1 }}>
                          <div className="stock-bar-fill" style={{ width: `${pct}%`, background: color }} />
                        </div>
                        <span style={{ fontSize: "0.75rem", color: "#6b7280", minWidth: 32 }}>{Math.round(pct)}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${p.quantity === 0 ? "badge-danger" : p.quantity <= 10 ? "badge-warning" : "badge-success"}`}>
                        {p.quantity === 0 ? "Out of Stock" : p.quantity <= 10 ? "Low Stock" : "In Stock"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
