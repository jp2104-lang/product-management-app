import React from "react";
import { formatCurrency } from "../utils/format";

export default function CartSummary({ total, products = [] }) {
  const totalItems = products.reduce((acc, p) => acc + p.quantity, 0);
  return (
    <div className="card">
      <h3>Cart Summary</h3>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="small">Items</div>
        <div>{totalItems}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="small">Total</div>
        <div style={{ fontWeight: 700 }}>{formatCurrency(total)}</div>
      </div>
      <div style={{ marginTop: 12 }}>
        <button className="btn" onClick={() => alert("Checkout demo")}>Checkout</button>
      </div>
    </div>
  );
}
