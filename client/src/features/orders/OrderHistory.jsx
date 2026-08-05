import { useEffect, useState } from "react";
import * as ordersApi from "../../api/orders.api";
import { getUserId } from "../../utils/authStorage";
import "./OrderHistory.css";

const centsToDollars = (cents) => (cents / 100).toFixed(2);

const STATUS_LABEL = {
  paid: "Paid",
  pending: "Pending",
  failed: "Failed",
  cancelled: "Cancelled",
};

/** Read-only order history, fetched fresh on every mount so a just-completed checkout shows up. */
export const OrderHistory = () => {
  const userId = getUserId();
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!userId) return;

    ordersApi
      .getOrders(userId)
      .then((response) => setOrders(response.data.data))
      .catch((error) => console.error("Error fetching orders:", error))
      .finally(() => setLoaded(true));
  }, [userId]);

  if (!loaded) return null;

  if (orders.length === 0) {
    return (
      <div className="empty-state">
        <h3>No Orders Yet</h3>
        <p>Purchases from the Shop will show up here once you check out.</p>
      </div>
    );
  }

  return (
    <div className="order-list">
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <div className="order-card__header">
            <div>
              <span className="order-card__date">
                {new Date(order.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span className="order-card__tran">Order #{order.tranId}</span>
            </div>
            <span className={`order-status order-status--${order.status}`}>
              {STATUS_LABEL[order.status] || order.status}
            </span>
          </div>

          <ul className="order-card__items">
            {order.items.map((item, index) => (
              <li key={index}>
                <span>
                  {item.name} <span className="order-card__qty">x{item.quantity}</span>
                </span>
                <span>${centsToDollars(item.unitPriceCents * item.quantity)}</span>
              </li>
            ))}
          </ul>

          <div className="order-card__total">
            <span>Total</span>
            <span>${centsToDollars(order.totalCents)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
