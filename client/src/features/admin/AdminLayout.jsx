import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ArticleIcon from "@mui/icons-material/Article";
import PlaceIcon from "@mui/icons-material/Place";
import "./Admin.css";

const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", icon: DashboardIcon, end: true },
  { to: "/admin/users", label: "Users", icon: PeopleIcon },
  { to: "/admin/products", label: "Products", icon: StorefrontIcon },
  { to: "/admin/orders", label: "Orders", icon: ReceiptLongIcon },
  { to: "/admin/blogs", label: "Blogs", icon: ArticleIcon },
  { to: "/admin/destinations", label: "Destinations", icon: PlaceIcon },
];

/** Wraps every /admin/* page with a persistent sidebar. Each admin route renders its own <AdminLayout> — the app has no nested-route layout convention. */
export const AdminLayout = ({ title, children }) => {
  const location = useLocation();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">Admin Panel</div>
        <nav className="admin-sidebar__nav">
          {NAV_ITEMS.map((item) => {
            const isActive = item.end
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`admin-sidebar__link${isActive ? " admin-sidebar__link--active" : ""}`}
              >
                <item.icon fontSize="small" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="admin-content">
        <h1 className="admin-content__title">{title}</h1>
        {children}
      </main>
    </div>
  );
};
