import React, { useState } from "react";

export default function AddProductForm({ addProduct }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    image: "",
    description: "",
    spec: "",
    rating: "",
    price: "",
    quantity: ""
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: null }));
  }

  function validate() {
    const err = {};
    if (!form.name.trim()) err.name = "Name required";
    if (!form.category.trim()) err.category = "Category required";
    if (!form.image.trim()) err.image = "Image URL required";
    if (!form.description.trim()) err.description = "Description required";
    if (!form.spec.trim()) err.spec = "Specification required";
    if (!form.rating || Number(form.rating) < 0) err.rating = "Valid rating required";
    if (form.price === "" || isNaN(Number(form.price)) || Number(form.price) < 0) err.price = "Valid price required";
    if (form.quantity === "" || isNaN(Number(form.quantity)) || Number(form.quantity) < 0) err.quantity = "Valid quantity required";
    return err;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }
    const newProduct = {
      id: "p_" + Date.now() + Math.floor(Math.random() * 1000),
      name: form.name,
      category: form.category,
      image: form.image,
      description: form.description,
      spec: form.spec,
      rating: Number(form.rating),
      price: Number(form.price),
      quantity: Number(form.quantity)
    };
    addProduct(newProduct);
    setForm({
      name: "",
      category: "",
      image: "",
      description: "",
      spec: "",
      rating: "",
      price: "",
      quantity: ""
    });
    setErrors({});
  }

  return (
    <div className="card">
      <h3>Add New Product</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Product Name</label>
          <input name="name" className="input" value={form.name} onChange={handleChange} />
          {errors.name && <small style={{ color: "red" }}>{errors.name}</small>}
        </div>

        <div className="form-row">
          <label>Category</label>
          <input name="category" className="input" value={form.category} onChange={handleChange} />
          {errors.category && <small style={{ color: "red" }}>{errors.category}</small>}
        </div>

        <div className="form-row">
          <label>Image URL</label>
          <input name="image" className="input" value={form.image} onChange={handleChange} />
          {errors.image && <small style={{ color: "red" }}>{errors.image}</small>}
        </div>

        <div className="form-row">
          <label>Description</label>
          <textarea name="description" className="input" rows="2" value={form.description} onChange={handleChange}></textarea>
          {errors.description && <small style={{ color: "red" }}>{errors.description}</small>}
        </div>

        <div className="form-row">
          <label>Specification</label>
          <input name="spec" className="input" value={form.spec} onChange={handleChange} />
          {errors.spec && <small style={{ color: "red" }}>{errors.spec}</small>}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ flex: 1 }}>
            <div className="form-row">
              <label>Rating</label>
              <input name="rating" className="input" type="number" step="0.1" value={form.rating} onChange={handleChange} />
              {errors.rating && <small style={{ color: "red" }}>{errors.rating}</small>}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div className="form-row">
              <label>Price</label>
              <input name="price" className="input" type="number" step="0.01" value={form.price} onChange={handleChange} />
              {errors.price && <small style={{ color: "red" }}>{errors.price}</small>}
            </div>
          </div>
        </div>

        <div className="form-row">
          <label>Quantity</label>
          <input name="quantity" className="input" type="number" step="1" value={form.quantity} onChange={handleChange} />
          {errors.quantity && <small style={{ color: "red" }}>{errors.quantity}</small>}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit" className="btn">Add Product</button>
          <button type="button" className="btn secondary" onClick={() => { setForm({ name: "", category: "", image: "", description: "", spec: "", rating: "", price: "", quantity: "" }); setErrors({}); }}>Reset</button>
        </div>
      </form>
    </div>
  );
}
