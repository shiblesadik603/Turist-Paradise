import { useEffect, useState } from "react";
import * as adminApi from "../../api/admin.api";
import { AdminLayout } from "./AdminLayout";

const centsToDollars = (cents) => (cents / 100).toFixed(2);

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    adminApi
      .getStats()
      .then((response) => setStats(response.data.data))
      .catch(() => setError("Couldn't load dashboard stats."));
  }, []);

  return (
    <AdminLayout title="Dashboard">
      {error && <div className="admin-error">{error}</div>}
      {!stats && !error && <p>Loading...</p>}
      {stats && (
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-card__label">Users</div>
            <div className="admin-stat-card__value">{stats.userCount}</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-card__label">Paid Orders</div>
            <div className="admin-stat-card__value">{stats.orderCount}</div>
            <div className="admin-stat-card__sub">
              ${centsToDollars(stats.revenueCents)} revenue
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-card__label">Products</div>
            <div className="admin-stat-card__value">{stats.productCount}</div>
            <div className="admin-stat-card__sub">
              {Object.entries(stats.productsByCategory)
                .map(([category, count]) => `${count} ${category}`)
                .join(" · ")}
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-card__label">Blog Posts</div>
            <div className="admin-stat-card__value">{stats.blogCount}</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-card__label">Destinations</div>
            <div className="admin-stat-card__value">{stats.spotCount}</div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
