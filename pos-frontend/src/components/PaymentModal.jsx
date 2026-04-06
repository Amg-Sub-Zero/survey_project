import { useState } from "react";
import { X, CreditCard, Smartphone, Banknote } from "lucide-react";

const methods = [
  { id: "cash", label: "Cash", icon: Banknote },
  { id: "card", label: "Card", icon: CreditCard },
  { id: "mobile", label: "Mobile Money", icon: Smartphone },
];

export default function PaymentModal({ total, onClose, onConfirm }) {
  const [method, setMethod] = useState("cash");
  const [amountReceived, setAmountReceived] = useState("");

  const change = method === "cash" && amountReceived ? Math.max(0, Number(amountReceived) - total) : 0;
  const canConfirm = method !== "cash" || (Number(amountReceived) >= total);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">Payment</span>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>Amount Due</div>
          <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#4f46e5" }}>${total.toFixed(2)}</div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div className="form-label">Payment Method</div>
          <div style={{ display: "flex", gap: 10 }}>
            {methods.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setMethod(id)}
                style={{
                  flex: 1, padding: "12px 8px", borderRadius: 10, cursor: "pointer",
                  border: `2px solid ${method === id ? "#4f46e5" : "#e5e7eb"}`,
                  background: method === id ? "#ede9fe" : "#fff",
                  color: method === id ? "#4f46e5" : "#374151",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                  fontWeight: 600, fontSize: "0.8rem", transition: "all 0.2s"
                }}
              >
                <Icon size={20} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {method === "cash" && (
          <div className="form-group">
            <label className="form-label">Amount Received</label>
            <input
              className="input"
              type="number"
              placeholder="Enter amount"
              value={amountReceived}
              onChange={e => setAmountReceived(e.target.value)}
              style={{ fontSize: "1.1rem", padding: "12px" }}
            />
            {amountReceived && (
              <div style={{
                marginTop: 10, padding: "10px 14px", borderRadius: 8,
                background: change >= 0 ? "#d1fae5" : "#fee2e2",
                color: change >= 0 ? "#065f46" : "#991b1b",
                fontWeight: 700, fontSize: "1rem"
              }}>
                Change: ${change.toFixed(2)}
              </div>
            )}
          </div>
        )}

        {method === "card" && (
          <div style={{ padding: "16px", background: "#f9fafb", borderRadius: 10, marginBottom: 16, textAlign: "center", color: "#6b7280", fontSize: "0.875rem" }}>
            Swipe or insert card on terminal
          </div>
        )}

        {method === "mobile" && (
          <div style={{ padding: "16px", background: "#f9fafb", borderRadius: 10, marginBottom: 16, textAlign: "center", color: "#6b7280", fontSize: "0.875rem" }}>
            Send ${total.toFixed(2)} to: <strong>0712 345 678</strong>
          </div>
        )}

        <button
          className="btn btn-success btn-lg btn-block"
          disabled={!canConfirm}
          onClick={() => onConfirm({ method, amountReceived: Number(amountReceived), change })}
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
}
