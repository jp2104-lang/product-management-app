import React, { useState, useMemo, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Header from "./components/Header";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import AddProductForm from "./components/AddProductForm";
import { DEFAULT_PRODUCTS } from "./data/defaultProducts";
import CartSummary from "./components/CartSummary";

function App() {
  const [products, setProducts] = useState(() =>
    // clone default to avoid mutation
    DEFAULT_PRODUCTS.map(p => ({ ...p }))
  );

  // category filter state is managed in ProductList; but we keep overall products here
  const navigate = useNavigate();

  // update quantity for a product by id (delta can be positive or negative)
  function changeQuantity(id, delta) {
    setProducts(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        const newQty = Math.max(0, Number(p.quantity) + Number(delta));
        return { ...p, quantity: newQty };
      })
    );
  }

  // set quantity directly (used by details maybe)
  function setQuantity(id, qty) {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, quantity: Math.max(0, Number(qty)) } : p))
    );
  }

  // add new product
  function addProduct(newProduct) {
    setProducts(prev => [{ ...newProduct }, ...prev]);
    navigate("/");
  }

  // compute subtotal for each product & overall total using useMemo for performance
  const productsWithSubtotal = useMemo(
    () =>
      products.map(p => ({
        ...p,
        price: Number(p.price),
        quantity: Number(p.quantity),
        subtotal: Number(p.price) * Number(p.quantity),
      })),
    [products]
  );

  const total = useMemo(
    () => productsWithSubtotal.reduce((acc, p) => acc + p.subtotal, 0),
    [productsWithSubtotal]
  );

  // optional: persist to localStorage so page refresh keeps changes (not required but handy)
  useEffect(() => {
    try {
      localStorage.setItem("pma_products_v1", JSON.stringify(products));
    } catch (e) {}
  }, [products]);

  // hydrate from localStorage on first load (if exists) to keep edits across refresh
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pma_products_v1");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
        }
      }
    } catch (e) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="main-grid">
                  <div className="left">
                    <ProductList
                      products={productsWithSubtotal}
                      onIncrease={(id) => changeQuantity(id, 1)}
                      onDecrease={(id) => changeQuantity(id, -1)}
                    />
                  </div>
                  <aside className="right">
                    <CartSummary total={total} products={productsWithSubtotal} />
                    <AddProductForm addProduct={addProduct} />
                  </aside>
                </div>
              </>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetails
                products={productsWithSubtotal}
                changeQuantity={setQuantity}
                onIncrease={(id) => changeQuantity(id, 1)}
                onDecrease={(id) => changeQuantity(id, -1)}
              />
            }
          />
          <Route
            path="*"
            element={
              <div style={{ padding: 20 }}>
                <h2>Page not found</h2>
                <button onClick={() => navigate("/")}>Back to Home</button>
              </div>
            }
          />
        </Routes>
      </main>
      <footer className="footer">
        <small>Product Management App — Demo for Pre-Final Exam</small>
      </footer>
    </div>
  );
}

export default App;
