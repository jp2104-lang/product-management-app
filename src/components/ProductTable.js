import React from "react";
import { formatCurrency } from "../utils/format";
import { Link } from "react-router-dom";

export default function ProductTable({ products, onIncrease, onDecrease }) {
  return (
    <table className="table card" style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Subtotal</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map(p => (
          <tr key={p.id}>
            <td style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <img src={p.image} alt={p.name} style={{ width: 54, height: 44, objectFit: "cover", borderRadius: 6 }} />
              <div>
                <div style={{ fontWeight: 700 }}>{p.name}</div>
                <div className="small">{p.category}</div>
              </div>
            </td>
            <td>{formatCurrency(p.price)}</td>
            <td>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <button className="qty-btn" onClick={() => onDecrease(p.id)} disabled={p.quantity <= 0}>−</button>
                <div>{p.quantity}</div>
                <button className="qty-btn" onClick={() => onIncrease(p.id)}>＋</button>
              </div>
            </td>
            <td>{formatCurrency(p.subtotal)}</td>
            <td><Link to={`/product/${p.id}`} className="btn secondary">Details</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
