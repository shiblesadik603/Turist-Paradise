import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";

import { AuthProvider } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import { Login } from "./features/auth/Login";
import { SignUp } from "./features/auth/Signup";
import { Home } from "./features/destinations/Home";
import { Userprofile } from "./features/profile/Userprofile";
import { TravelPlan } from "./features/planner/TravelPlan";
import { SavedPlan } from "./features/planner/SavedPlan";
import { Shop } from "./features/shop/Shop";
import { Cart } from "./features/cart/Cart";
import { PaymentSuccess } from "./features/cart/PaymentSuccess";
import { PaymentFailed } from "./features/cart/PaymentFailed";

function App() {
  return (
    <AuthProvider>
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={["places"]}
      >
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<ProtectedRoute component={Home} />} />
            <Route path="/userprofile" element={<ProtectedRoute component={Userprofile} />} />
            <Route path="/travelplan" element={<ProtectedRoute component={TravelPlan} />} />
            <Route path="/savedplan" element={<ProtectedRoute component={SavedPlan} />} />
            <Route path="/shop" element={<ProtectedRoute component={Shop} />} />
            <Route path="/cart" element={<ProtectedRoute component={Cart} />} />
            <Route
              path="/payment-success"
              element={<ProtectedRoute component={PaymentSuccess} />}
            />
            <Route path="/payment-failed" element={<ProtectedRoute component={PaymentFailed} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </LoadScript>
    </AuthProvider>
  );
}

export default App;
