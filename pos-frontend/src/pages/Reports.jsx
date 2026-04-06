import { TrendingUp, ShoppingBag, DollarSign, Users } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend, CartesianGrid
} from "recharts";
import { salesData, categoryData, recentSales, products } from "../data/dummyData";

const COLORS = ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];

const weeklyLine = [
  { week: "W1", revenue: 1820, orders: 42 },
  { week: "W2", revenue: 2340, orders: 58 },
  { week: "W3", revenue: 1980, orders: 47 },
  { week: "W4", revenue: 2820, orders: 71 },
];

const topProducts = products.slice(0, 5).map((p, i) => ({
  name: p.name.split(" ")[0],
  sold: [45, 38, 32, 28, 21][i],
}));

export default function Reports() {
  return (
    <div>
      <div className="grid-4" style={{ marginBottom: 24 }}>
        {[
          { label: "Daily Revenue", value: "$820", icon: DollarSign, color: "#4f46e5", bg: "#ede9fe" },
          { label: "Weekly Revenue", value: "$3,440", icon: TrendingUp, color: "#10b981", bg: "#d1fae5" },
          { label: "Total Orders", value: "218", icon: ShoppingBag, color: "#06b6d4", bg: "#cffafe" },
          { label: "Avg Order Value", value: "$15.78", icon: Users, color: "#f59e0b", bg: "#fef3c7" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
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
          <h3 style={{ marginBottom: 16, fontWeight: 600 }}>Daily Sales (This Week)</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={v => `$${v}`} />
                <Bar dataKey="sales" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 16, fontWeight: 600 }}>Weekly Revenue Trend</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyLine}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={v => `$${v}`} />
                <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <h3 style={{ marginBottom: 16, fontWeight: 600 }}>Top Products Sold</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={70} />
                <Tooltip />
                <Bar dataKey="sold" fill="#06b6d4" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 16, fontWeight: 600 }}>Revenue by Category</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90}>
                  {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 16, fontWeight: 600 }}>Recent Transactions</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Method</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.map(s => (
                <tr key={s.id}>
                  <td style={{ color: "#4f46e5", fontWeight: 600 }}>{s.id}</td>
                  <td>{s.customer}</td>
                  <td style={{ color: "#6b7280" }}>{s.date}</td>
                  <td style={{ fontWeight: 700 }}>${s.total.toFixed(2)}</td>
                  <td><span className="badge badge-info">{s.method}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
