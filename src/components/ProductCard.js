import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/format";

export default function ProductCard({ product, onIncrease, onDecrease }) {
  const lowStock = product.quantity < 5;
  return (
    <div className={`product-row ${lowStock ? "low-stock" : ""}`}>
      <img src={product.image} alt={product.name} />
      <div className="product-meta">
        <h3 className="product-title">{product.name}</h3>
        <div className="product-cat">{product.category} • Rating: {product.rating}</div>
        <div style={{ marginTop: 6 }} className="small">{product.description}</div>
        <div style={{ marginTop: 8, display: "flex", gap: 12, alignItems: "center" }}>
          <div><strong>{formatCurrency(product.price)}</strong></div>
          <div className="small">Subtotal: <strong>{formatCurrency(product.subtotal)}</strong></div>
        </div>
      </div>

      <div style={{ textAlign: "right" }}>
        <div style={{ display: "flex", gap: 6, justifyContent: "flex-end", marginBottom: 8 }}>
          <button className="qty-btn" onClick={onDecrease} disabled={product.quantity <= 0}>−</button>
          <div style={{ padding: "6px 8px", borderRadius: 6, border: "1px solid #eee" }}>{product.quantity}</div>
          <button className="qty-btn" onClick={onIncrease}>＋</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Link to={`/product/${product.id}`} className="btn secondary">Details</Link>
          <button className="btn" onClick={() => alert("Added to cart (demo)")} title="Add to cart">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
