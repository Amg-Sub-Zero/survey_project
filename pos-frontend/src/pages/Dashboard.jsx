import { TrendingUp, ShoppingBag, Users, Package, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { salesData, categoryData, recentSales, products } from "../data/dummyData";

const COLORS = ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];

const stats = [
  { label: "Today's Sales", value: "$820.00", icon: TrendingUp, color: "#4f46e5", bg: "#ede9fe" },
  { label: "Orders Today", value: "34", icon: ShoppingBag, color: "#10b981", bg: "#d1fae5" },
  { label: "Customers", value: "4", icon: Users, color: "#06b6d4", bg: "#cffafe" },
  { label: "Products", value: products.length, icon: Package, color: "#f59e0b", bg: "#fef3c7" },
];

const lowStock = products.filter(p => p.quantity <= 8);

export default function Dashboard() {
  return (
    <div>
      <div className="grid-4" style={{ marginBottom: 24 }}>
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div className="stat-card" key={label}>
            <div className="stat-icon" style={{ background: bg }}>
              <Icon size={22} color={color} />
            </div>
            <div className="stat-info">
              <h3>{value}</h3>
              <p>{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <h3 style={{ marginBottom: 16, fontWeight: 600 }}>Weekly Sales</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v) => `$${v}`} />
                <Bar dataKey="sales" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 16, fontWeight: 600 }}>Sales by Category</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                  {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 style={{ marginBottom: 16, fontWeight: 600 }}>Recent Sales</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Method</th>
                </tr>
              </thead>
              <tbody>
                {recentSales.map(s => (
                  <tr key={s.id}>
                    <td style={{ color: "#4f46e5", fontWeight: 600 }}>{s.id}</td>
                    <td>{s.customer}</td>
                    <td>${s.total.toFixed(2)}</td>
                    <td><span className="badge badge-info">{s.method}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <AlertTriangle size={18} color="#f59e0b" />
            <h3 style={{ fontWeight: 600 }}>Low Stock Alerts</h3>
          </div>
          {lowStock.map(p => (
            <div key={p.id} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>{p.name}</span>
                <span className={`badge ${p.quantity === 0 ? "badge-danger" : "badge-warning"}`}>
                  {p.quantity === 0 ? "Out of Stock" : `${p.quantity} left`}
                </span>
              </div>
              <div className="stock-bar">
                <div className="stock-bar-fill" style={{
                  width: `${Math.min((p.quantity / 20) * 100, 100)}%`,
                  background: p.quantity === 0 ? "#ef4444" : "#f59e0b"
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
