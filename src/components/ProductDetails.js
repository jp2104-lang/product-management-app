import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/format";

export default function ProductDetails({ products, changeQuantity, onIncrease, onDecrease }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="card">
        <h2>Product not found</h2>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
    );
  }

  return (
    <div className="card" style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
      <div style={{ maxWidth: 420 }}>
        <img src={product.image} alt={product.name} style={{ width: "100%", borderRadius: 8 }} />
      </div>

      <div style={{ flex: 1 }}>
        <h2>{product.name}</h2>
        <div className="small">{product.category} • Rating: {product.rating}</div>
        <p style={{ marginTop: 12 }}>{product.description}</p>
        <div style={{ marginTop: 6 }}><strong>Spec:</strong> {product.spec}</div>
        <div style={{ marginTop: 12 }}><strong>Price:</strong> {formatCurrency(product.price)}</div>
        <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center" }}>
          <button className="qty-btn" onClick={() => onDecrease(product.id)} disabled={product.quantity <= 0}>−</button>
          <input
            style={{ width: 72, padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
            type="number"
            min="0"
            value={product.quantity}
            onChange={(e) => changeQuantity(product.id, Math.max(0, Number(e.target.value)))}
          />
          <button className="qty-btn" onClick={() => onIncrease(product.id)}>＋</button>
        </div>

        <div style={{ marginTop: 12 }}><strong>Subtotal:</strong> {formatCurrency(product.subtotal)}</div>

        <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
          <button className="btn" onClick={() => alert("Add to cart (demo)")}>Add to Cart</button>
          <button className="btn secondary" onClick={() => navigate("/")}>Back</button>
        </div>

        {product.quantity < 5 && (
          <div style={{ marginTop: 12 }} className="low-stock">
            <strong>Low Stock:</strong> Only {product.quantity} left.
          </div>
        )}
      </div>
    </div>
  );
}

