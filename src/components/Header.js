import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header card">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/OOjs_UI_icon_shopping-cart.svg" alt="logo" style={{ width: 36 }} />
        <div>
          <h1>Product Management App</h1>
          <div className="small">React • Hooks • Router • Demo</div>
        </div>
      </div>
      <nav>
        <Link to="/">Products</Link>
        <Link to="/" style={{ marginLeft: 12 }}>Add Product</Link>
      </nav>
    </header>
  );
}
