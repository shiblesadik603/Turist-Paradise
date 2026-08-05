import { useEffect, useMemo, useState } from "react";
import * as usersApi from "../../api/users.api";
import { useAuth } from "../../hooks/useAuth";
import { AdminLayout } from "./AdminLayout";

export const AdminUsers = () => {
  const { userId: currentUserId } = useAuth();
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const loadUsers = () => {
    usersApi
      .getAllUsers()
      .then((response) => setUsers(response.data.data))
      .catch(() => setError("Couldn't load users."))
      .finally(() => setLoaded(true));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (user) => user.name?.toLowerCase().includes(q) || user.email?.toLowerCase().includes(q)
    );
  }, [users, search]);

  const handleToggleRole = async (user) => {
    const nextRole = user.role === "admin" ? "customer" : "admin";
    setBusyId(user._id);
    setError(null);
    try {
      const response = await usersApi.updateUserRole(user._id, nextRole);
      setUsers((prev) => prev.map((u) => (u._id === user._id ? response.data.data : u)));
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't update role.");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Delete ${user.name || user.email}? This can't be undone.`)) return;
    setBusyId(user._id);
    setError(null);
    try {
      await usersApi.deleteUser(user._id);
      setUsers((prev) => prev.filter((u) => u._id !== user._id));
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't delete user.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <AdminLayout title="Users">
      {error && <div className="admin-error">{error}</div>}

      <div className="admin-toolbar">
        <input
          className="admin-search"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="admin-table-wrap">
        {loaded && filtered.length === 0 ? (
          <div className="admin-empty">No users found.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => {
                const isSelf = user._id === currentUserId;
                return (
                  <tr key={user._id}>
                    <td>{user.name || "—"}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`admin-badge admin-badge--${user.role}`}>{user.role}</span>
                    </td>
                    <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}</td>
                    <td className="admin-table__actions">
                      <button
                        className="admin-btn admin-btn--ghost"
                        disabled={isSelf || busyId === user._id}
                        onClick={() => handleToggleRole(user)}
                      >
                        {user.role === "admin" ? "Demote" : "Promote"}
                      </button>
                      <button
                        className="admin-btn admin-btn--danger"
                        disabled={isSelf || busyId === user._id}
                        onClick={() => handleDelete(user)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
};
