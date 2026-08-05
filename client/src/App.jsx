import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import { theme } from "./theme";
import { AuthProvider } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import { Login } from "./features/auth/Login";
import { SignUp } from "./features/auth/Signup";
import { Home } from "./features/destinations/Home";
import { SpotDetail } from "./features/destinations/SpotDetail";
import { Userprofile } from "./features/profile/Userprofile";
import { TravelPlan } from "./features/planner/TravelPlan";
import { Shop } from "./features/shop/Shop";
import { Cart } from "./features/cart/Cart";
import { PaymentSuccess } from "./features/cart/PaymentSuccess";
import { PaymentFailed } from "./features/cart/PaymentFailed";
import { Blogs } from "./features/blogs/Blogs";
import { BlogDetail } from "./features/blogs/BlogDetail";
import { WriteBlog } from "./features/blogs/WriteBlog";
import { AdminDashboard } from "./features/admin/AdminDashboard";
import { AdminUsers } from "./features/admin/AdminUsers";
import { AdminProducts } from "./features/admin/AdminProducts";
import { AdminOrders } from "./features/admin/AdminOrders";
import { AdminBlogs } from "./features/admin/AdminBlogs";
import { AdminDestinations } from "./features/admin/AdminDestinations";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<ProtectedRoute component={Home} />} />
            <Route path="/destinations/:slug" element={<ProtectedRoute component={SpotDetail} />} />
            <Route path="/userprofile" element={<ProtectedRoute component={Userprofile} />} />
            <Route path="/travelplan" element={<ProtectedRoute component={TravelPlan} />} />
            <Route path="/shop" element={<ProtectedRoute component={Shop} />} />
            <Route path="/cart" element={<ProtectedRoute component={Cart} />} />
            <Route
              path="/payment-success"
              element={<ProtectedRoute component={PaymentSuccess} />}
            />
            <Route path="/payment-failed" element={<ProtectedRoute component={PaymentFailed} />} />
            <Route path="/blogs" element={<ProtectedRoute component={Blogs} />} />
            <Route path="/blogs/new" element={<ProtectedRoute component={WriteBlog} />} />
            <Route path="/blogs/:id" element={<ProtectedRoute component={BlogDetail} />} />
            <Route
              path="/admin"
              element={<ProtectedRoute component={AdminDashboard} adminOnly />}
            />
            <Route
              path="/admin/users"
              element={<ProtectedRoute component={AdminUsers} adminOnly />}
            />
            <Route
              path="/admin/products"
              element={<ProtectedRoute component={AdminProducts} adminOnly />}
            />
            <Route
              path="/admin/orders"
              element={<ProtectedRoute component={AdminOrders} adminOnly />}
            />
            <Route
              path="/admin/blogs"
              element={<ProtectedRoute component={AdminBlogs} adminOnly />}
            />
            <Route
              path="/admin/destinations"
              element={<ProtectedRoute component={AdminDestinations} adminOnly />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
