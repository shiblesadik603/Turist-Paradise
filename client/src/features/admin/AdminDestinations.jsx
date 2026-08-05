import { useEffect, useState } from "react";
import * as destinationsApi from "../../api/destinations.api";
import { AdminLayout } from "./AdminLayout";

const EMPTY_FORM = {
  name: "",
  slug: "",
  description: "",
  imageUrl: "",
  latitude: "",
  longitude: "",
  highlights: "",
};

const toFormValues = (spot) => ({
  name: spot.name || "",
  slug: spot.slug || "",
  description: spot.description || "",
  imageUrl: spot.imageUrl || "",
  latitude: spot.latitude ?? "",
  longitude: spot.longitude ?? "",
  highlights: (spot.highlights || []).join(", "),
});

const DestinationForm = ({ initial, isEdit, onCancel, onSubmit, error, saving }) => {
  const [form, setForm] = useState(initial);

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="admin-modal-overlay" onClick={onCancel}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="admin-modal__title">{isEdit ? "Edit Destination" : "Add Destination"}</h2>
        {error && <div className="admin-error">{error}</div>}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
        >
          <div className="admin-form-field">
            <label>Name</label>
            <input value={form.name} onChange={handleChange("name")} required />
          </div>
          <div className="admin-form-field">
            <label>Slug</label>
            <input value={form.slug} onChange={handleChange("slug")} disabled={isEdit} required />
          </div>
          <div className="admin-form-field">
            <label>Description</label>
            <textarea rows={3} value={form.description} onChange={handleChange("description")} />
          </div>
          <div className="admin-form-field">
            <label>Image URL</label>
            <input value={form.imageUrl} onChange={handleChange("imageUrl")} />
          </div>
          <div className="admin-form-field">
            <label>Latitude</label>
            <input
              type="number"
              step="any"
              value={form.latitude}
              onChange={handleChange("latitude")}
            />
          </div>
          <div className="admin-form-field">
            <label>Longitude</label>
            <input
              type="number"
              step="any"
              value={form.longitude}
              onChange={handleChange("longitude")}
            />
          </div>
          <div className="admin-form-field">
            <label>Highlights (comma-separated)</label>
            <input value={form.highlights} onChange={handleChange("highlights")} />
          </div>

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

export const AdminDestinations = () => {
  const [spots, setSpots] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [listError, setListError] = useState(null);
  const [modalMode, setModalMode] = useState(null); // null | "add" | { edit: spot }
  const [formError, setFormError] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadSpots = () => {
    destinationsApi
      .getSpots()
      .then((response) => setSpots(response.data.data))
      .catch(() => setListError("Couldn't load destinations."))
      .finally(() => setLoaded(true));
  };

  useEffect(() => {
    loadSpots();
  }, []);

  const closeModal = () => setModalMode(null);

  const handleSubmit = async (form) => {
    setSaving(true);
    setFormError(null);
    const highlights = form.highlights
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean);
    const payload = {
      name: form.name,
      description: form.description,
      imageUrl: form.imageUrl,
      latitude: form.latitude === "" ? undefined : Number(form.latitude),
      longitude: form.longitude === "" ? undefined : Number(form.longitude),
      highlights,
    };

    try {
      if (modalMode === "add") {
        await destinationsApi.createDestination({ ...payload, slug: form.slug });
      } else {
        await destinationsApi.updateDestination(modalMode.edit.slug, payload);
      }
      closeModal();
      loadSpots();
    } catch (err) {
      setFormError(err.response?.data?.message || "Couldn't save destination.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (spot) => {
    if (!window.confirm(`Delete "${spot.name}"? This can't be undone.`)) return;
    try {
      await destinationsApi.deleteDestination(spot.slug);
      loadSpots();
    } catch (err) {
      setListError(err.response?.data?.message || "Couldn't delete destination.");
    }
  };

  return (
    <AdminLayout title="Destinations">
      {listError && <div className="admin-error">{listError}</div>}

      <div className="admin-toolbar">
        <span />
        <button
          className="admin-btn admin-btn--primary"
          onClick={() => {
            setFormError(null);
            setModalMode("add");
          }}
        >
          + Add Destination
        </button>
      </div>

      <div className="admin-table-wrap">
        {loaded && spots.length === 0 ? (
          <div className="admin-empty">No destinations yet.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Slug</th>
                <th>Coordinates</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {spots.map((spot) => (
                <tr key={spot.slug}>
                  <td>
                    {spot.imageUrl && (
                      <img src={spot.imageUrl} alt="" className="admin-table__thumb" />
                    )}
                  </td>
                  <td>{spot.name}</td>
                  <td>{spot.slug}</td>
                  <td>
                    {spot.latitude != null && spot.longitude != null
                      ? `${spot.latitude}, ${spot.longitude}`
                      : "—"}
                  </td>
                  <td className="admin-table__actions">
                    <button
                      className="admin-btn admin-btn--ghost"
                      onClick={() => {
                        setFormError(null);
                        setModalMode({ edit: spot });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="admin-btn admin-btn--danger"
                      onClick={() => handleDelete(spot)}
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
        <DestinationForm
          isEdit={modalMode !== "add"}
          initial={modalMode === "add" ? EMPTY_FORM : toFormValues(modalMode.edit)}
          onCancel={closeModal}
          onSubmit={handleSubmit}
          error={formError}
          saving={saving}
        />
      )}
    </AdminLayout>
  );
};
