import { useState } from "react";
import { Search, Barcode, Trash2, Tag, X } from "lucide-react";
import { products as allProducts } from "../data/dummyData";
import PaymentModal from "../components/PaymentModal";
import ReceiptModal from "../components/ReceiptModal";

export default function POS() {
  const [search, setSearch] = useState("");
  const [barcode, setBarcode] = useState("");
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastSale, setLastSale] = useState(null);

  const filtered = allProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product) => {
    if (product.quantity === 0) return;
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev
      .map(i => i.id === id ? { ...i, qty: i.qty + delta } : i)
      .filter(i => i.qty > 0)
    );
  };

  const removeItem = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const handleBarcodeSearch = (e) => {
    if (e.key === "Enter") {
      const found = allProducts.find(p => p.barcode === barcode);
      if (found) { addToCart(found); setBarcode(""); }
    }
  };

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discountAmt = subtotal * (discount / 100);
  const total = subtotal - discountAmt;

  const handleCheckout = (paymentData) => {
    setLastSale({ cart, subtotal, discountAmt, total, ...paymentData, date: new Date().toLocaleString() });
    setShowPayment(false);
    setShowReceipt(true);
    setCart([]);
    setDiscount(0);
  };

  return (
    <>
      <div className="pos-layout" style={{ margin: "-24px" }}>
        {/* Left: Products */}
        <div className="pos-left">
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            <div className="input-group" style={{ flex: 1 }}>
              <Search size={16} className="input-icon" />
              <input className="input" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <Barcode size={16} className="input-icon" />
              <input
                className="input"
                placeholder="Scan barcode & press Enter"
                value={barcode}
                onChange={e => setBarcode(e.target.value)}
                onKeyDown={handleBarcodeSearch}
              />
            </div>
          </div>

          <div className="product-grid">
            {filtered.map(p => (
              <div
                key={p.id}
                className={`product-card${p.quantity === 0 ? " out-of-stock" : ""}`}
                onClick={() => addToCart(p)}
              >
                <div style={{ fontSize: "2rem", marginBottom: 8 }}>
                  {p.category === "Beverages" ? "🥤" : p.category === "Dairy" ? "🥛" : p.category === "Bakery" ? "🍞" : p.category === "Meat" ? "🥩" : "📦"}
                </div>
                <div className="product-name">{p.name}</div>
                <div className="product-price">${p.price.toFixed(2)}</div>
                <div className="product-stock">{p.quantity === 0 ? "Out of stock" : `${p.quantity} in stock`}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Cart */}
        <div className="pos-right">
          <div className="cart-header">
            🛒 Cart ({cart.length} items)
          </div>

          <div className="cart-items">
            {cart.length === 0 && (
              <div style={{ textAlign: "center", color: "#9ca3af", marginTop: 40 }}>
                <ShoppingCartEmpty />
                <p style={{ marginTop: 12 }}>No items in cart</p>
              </div>
            )}
            {cart.map(item => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">${item.price.toFixed(2)} each · ${(item.price * item.qty).toFixed(2)}</div>
                </div>
                <div className="qty-controls">
                  <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                  <span className="qty-display">{item.qty}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                  <button className="qty-btn" style={{ color: "#ef4444" }} onClick={() => removeItem(item.id)}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <Tag size={15} color="#6b7280" />
              <input
                className="input"
                type="number"
                placeholder="Discount %"
                value={discount}
                min={0} max={100}
                onChange={e => setDiscount(Number(e.target.value))}
                style={{ width: 120 }}
              />
              <span style={{ fontSize: "0.8rem", color: "#6b7280" }}>% off</span>
            </div>

            <div className="cart-totals">
              <div className="cart-total-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              {discount > 0 && <div className="cart-total-row" style={{ color: "#10b981" }}><span>Discount ({discount}%)</span><span>-${discountAmt.toFixed(2)}</span></div>}
              <div className="cart-total-row grand"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>

            <button
              className="btn btn-success btn-lg btn-block"
              disabled={cart.length === 0}
              onClick={() => setShowPayment(true)}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {showPayment && (
        <PaymentModal
          total={total}
          onClose={() => setShowPayment(false)}
          onConfirm={handleCheckout}
        />
      )}
      {showReceipt && lastSale && (
        <ReceiptModal sale={lastSale} onClose={() => setShowReceipt(false)} />
      )}
    </>
  );
}

function ShoppingCartEmpty() {
  return (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  );
}
