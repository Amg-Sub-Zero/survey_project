import { X, Printer, Download } from "lucide-react";

export default function ReceiptModal({ sale, onClose }) {
  const { cart, subtotal, discountAmt, total, method, amountReceived, change, date } = sale;

  return (
    <div className="modal-overlay">
      <div className="modal" style={{ maxWidth: 400 }}>
        <div className="modal-header">
          <span className="modal-title">Receipt</span>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="receipt" id="receipt-content">
          <div className="receipt-header">
            <div style={{ fontSize: "1.2rem", fontWeight: 700 }}>ShopPOS Store</div>
            <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>123 Main Street, City</div>
            <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>Tel: +1 234 567 890</div>
            <div style={{ fontSize: "0.8rem", marginTop: 6 }}>{date}</div>
          </div>

          <hr className="receipt-divider" />

          {cart.map(item => (
            <div className="receipt-row" key={item.id}>
              <span>{item.name} x{item.qty}</span>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}

          <hr className="receipt-divider" />

          <div className="receipt-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          {discountAmt > 0 && <div className="receipt-row" style={{ color: "#10b981" }}><span>Discount</span><span>-${discountAmt.toFixed(2)}</span></div>}
          <div className="receipt-row receipt-total"><span>TOTAL</span><span>${total.toFixed(2)}</span></div>

          <hr className="receipt-divider" />

          <div className="receipt-row"><span>Payment</span><span>{method}</span></div>
          {method === "cash" && <>
            <div className="receipt-row"><span>Received</span><span>${Number(amountReceived).toFixed(2)}</span></div>
            <div className="receipt-row"><span>Change</span><span>${Number(change).toFixed(2)}</span></div>
          </>}

          <hr className="receipt-divider" />
          <div style={{ textAlign: "center", fontSize: "0.8rem", color: "#6b7280", marginTop: 8 }}>
            Thank you for shopping with us!
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button className="btn btn-outline btn-block" onClick={() => window.print()}>
            <Printer size={15} /> Print
          </button>
          <button className="btn btn-primary btn-block" onClick={onClose}>
            <Download size={15} /> Done
          </button>
        </div>
      </div>
    </div>
  );
}
