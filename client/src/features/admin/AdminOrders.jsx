import { useEffect, useState } from "react";
import * as ordersApi from "../../api/orders.api";
import { AdminLayout } from "./AdminLayout";

const centsToDollars = (cents) => (cents / 100).toFixed(2);

const STATUS_LABEL = {
  paid: "Paid",
  pending: "Pending",
  failed: "Failed",
  cancelled: "Cancelled",
};

export const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    ordersApi
      .getAllOrders()
      .then((response) => setOrders(response.data.data))
      .catch(() => setError("Couldn't load orders."))
      .finally(() => setLoaded(true));
  }, []);

  return (
    <AdminLayout title="Orders">
      {error && <div className="admin-error">{error}</div>}

      <div className="admin-table-wrap">
        {loaded && orders.length === 0 ? (
          <div className="admin-empty">No orders yet.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Transaction</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    {new Date(order.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td>{order.tranId}</td>
                  <td title={order.userId}>{order.userId.slice(-8)}</td>
                  <td>{order.items.length} item(s)</td>
                  <td>${centsToDollars(order.totalCents)}</td>
                  <td>
                    <span className={`order-status order-status--${order.status}`}>
                      {STATUS_LABEL[order.status] || order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
};
