import React from "react";

export default function CategoryFilter({ categories, value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
      <label className="small">Filter:</label>
      <select className="input" value={value} onChange={e => onChange(e.target.value)}>
        <option value="All">All</option>
        {categories.map(c => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
