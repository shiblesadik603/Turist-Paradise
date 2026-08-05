import { useEffect, useState } from "react";
import * as shopApi from "../../api/shop.api";
import { AdminLayout } from "./AdminLayout";

const CATEGORIES = ["power", "sleep", "bags", "rain", "security"];

const BAG_CATEGORY_OPTIONS = [
  "backpack",
  "luggage",
  "packing organizers",
  "sling bag",
  "toiletry bag",
  "duffel bag",
  "travel wallet",
  "bag organizer",
];

const EMPTY_FORM = {
  id: "",
  product_name: "",
  price: "",
  stock: "",
  description: "",
  img_url: "",
  category: BAG_CATEGORY_OPTIONS[0],
};

const ProductForm = ({ category, initial, onCancel, onSubmit, error, saving, isEdit }) => {
  const [form, setForm] = useState(initial);

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="admin-modal-overlay" onClick={onCancel}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="admin-modal__title">{isEdit ? "Edit Product" : "Add Product"}</h2>
        {error && <div className="admin-error">{error}</div>}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
        >
          {!isEdit && (
            <div className="admin-form-field">
              <label>ID</label>
              <input value={form.id} onChange={handleChange("id")} required />
            </div>
          )}
          <div className="admin-form-field">
            <label>Name</label>
            <input value={form.product_name} onChange={handleChange("product_name")} required />
          </div>
          <div className="admin-form-field">
            <label>Price ($)</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={form.price}
              onChange={handleChange("price")}
              required
            />
          </div>
          <div className="admin-form-field">
            <label>Stock</label>
            <input
              type="number"
              min="0"
              value={form.stock}
              onChange={handleChange("stock")}
              required
            />
          </div>
          <div className="admin-form-field">
            <label>Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={handleChange("description")}
              required
            />
          </div>
          <div className="admin-form-field">
            <label>Image URL</label>
            <input value={form.img_url} onChange={handleChange("img_url")} required />
          </div>
          {category === "bags" && (
            <div className="admin-form-field">
              <label>Category</label>
              <select value={form.category} onChange={handleChange("category")}>
                {BAG_CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="admin-modal__actions">
            <button type="button" className="admin-btn admin-btn--ghost" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const AdminProducts = () => {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [listError, setListError] = useState(null);
  const [modalMode, setModalMode] = useState(null); // null | "add" | { edit: product }
  const [formError, setFormError] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadProducts = (cat) => {
    setLoaded(false);
    shopApi
      .getProductsByCategory(cat)
      .then((response) => setProducts(response.data.data))
      .catch(() => setListError("Couldn't load products."))
      .finally(() => setLoaded(true));
  };

  useEffect(() => {
    loadProducts(category);
  }, [category]);

  const handleAdd = () => {
    setFormError(null);
    setModalMode("add");
  };

  const handleEdit = (product) => {
    setFormError(null);
    setModalMode({ edit: product });
  };

  const closeModal = () => setModalMode(null);

  const handleSubmit = async (form) => {
    setSaving(true);
    setFormError(null);
    const payload = {
      product_name: form.product_name,
      price: Number(form.price),
      stock: Number(form.stock),
      description: form.description,
      img_url: form.img_url,
      ...(category === "bags" ? { category: form.category } : {}),
    };

    try {
      if (modalMode === "add") {
        await shopApi.createProduct(category, { ...payload, id: form.id });
      } else {
        await shopApi.updateProduct(modalMode.edit.id, payload);
      }
      closeModal();
      loadProducts(category);
    } catch (err) {
      setFormError(err.response?.data?.message || "Couldn't save product.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Delete "${product.product_name}"? This can't be undone.`)) return;
    try {
      await shopApi.deleteProduct(product.id);
      loadProducts(category);
    } catch (err) {
      setListError(err.response?.data?.message || "Couldn't delete product.");
    }
  };

  return (
    <AdminLayout title="Products">
      {listError && <div className="admin-error">{listError}</div>}

      <div className="admin-tabs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`admin-tab${cat === category ? " admin-tab--active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="admin-toolbar">
        <span />
        <button className="admin-btn admin-btn--primary" onClick={handleAdd}>
          + Add Product
        </button>
      </div>

      <div className="admin-table-wrap">
        {loaded && products.length === 0 ? (
          <div className="admin-empty">No products in this category yet.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th></th>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img src={product.img_url} alt="" className="admin-table__thumb" />
                  </td>
                  <td>{product.id}</td>
                  <td>{product.product_name}</td>
                  <td>${Number(product.price).toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td className="admin-table__actions">
                    <button
                      className="admin-btn admin-btn--ghost"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="admin-btn admin-btn--danger"
                      onClick={() => handleDelete(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalMode && (
        <ProductForm
          category={category}
          isEdit={modalMode !== "add"}
          initial={modalMode === "add" ? EMPTY_FORM : { ...EMPTY_FORM, ...modalMode.edit }}
          onCancel={closeModal}
          onSubmit={handleSubmit}
          error={formError}
          saving={saving}
        />
      )}
    </AdminLayout>
  );
};
