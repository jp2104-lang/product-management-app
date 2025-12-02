import React, { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import ProductTable from "./ProductTable";
import CategoryFilter from "./CategoryFilter";

export default function ProductList({ products, onIncrease, onDecrease }) {
  const [view, setView] = useState("card"); // card or table
  const [category, setCategory] = useState("All");
  const uniqueCategories = useMemo(() => {
    const s = new Set();
    products.forEach(p => s.add(p.category));
    return Array.from(s);
  }, [products]);

  const filtered = useMemo(
    () => (category === "All" ? products : products.filter(p => p.category === category)),
    [products, category]
  );

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <h2>Products</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn secondary" onClick={() => setView("card")}>Card</button>
          <button className="btn secondary" onClick={() => setView("table")}>Table</button>
        </div>
      </div>

      <CategoryFilter categories={uniqueCategories} value={category} onChange={setCategory} />

      <div className="product-list">
        {filtered.length === 0 && <div className="card small">No products found.</div>}

        {view === "card" ? (
          filtered.map(p => (
            <ProductCard key={p.id} product={p} onIncrease={() => onIncrease(p.id)} onDecrease={() => onDecrease(p.id)} />
          ))
        ) : (
          <ProductTable products={filtered} onIncrease={onIncrease} onDecrease={onDecrease} />
        )}
      </div>
    </div>
  );
}
