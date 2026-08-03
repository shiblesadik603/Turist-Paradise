import { useRef, useState, useEffect } from "react";
import { Container, Fab, Snackbar, Alert } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useNavigate } from "react-router-dom";
import * as cartApi from "../../api/cart.api";
import { useCategoryProducts } from "./useCategoryProducts";
import { ProductSection } from "./ProductSection";
import { ShopHero } from "./ShopHero";
import { CategoryNav } from "./CategoryNav";
import { CartFab } from "./CartFab";

const CATEGORIES = [
  { id: "power", navLabel: "Power", title: "Power Accessories", errorLabel: "power" },
  { id: "sleep", navLabel: "Sleep & Comfort", title: "Sleep & Comfort", errorLabel: "sleep" },
  { id: "security", navLabel: "Security", title: "Travel Security", errorLabel: "security" },
  { id: "bags", navLabel: "Bags & Luggage", title: "Bags & Luggage", errorLabel: "bag" },
  { id: "rain", navLabel: "Rain Protection", title: "Rain Protection", errorLabel: "rain" },
];

export const Shop = () => {
  const navigate = useNavigate();

  const sectionRefs = {
    power: useRef(null),
    sleep: useRef(null),
    security: useRef(null),
    bags: useRef(null),
    rain: useRef(null),
  };

  const [activeCategory, setActiveCategory] = useState("power");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const productsByCategory = {
    power: useCategoryProducts("power"),
    sleep: useCategoryProducts("sleep"),
    security: useCategoryProducts("security"),
    bags: useCategoryProducts("bags"),
    rain: useCategoryProducts("rain"),
  };

  // Fix body overflow issue on mount
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalHeight = document.body.style.height;

    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    document.body.style.minHeight = "100vh";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.height = originalHeight;
    };
  }, []);

  // Load cart count on component mount
  useEffect(() => {
    loadCartCount();
  }, []);

  // Load cart count from backend
  const loadCartCount = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const response = await cartApi.getCart(userId);
      const cartData = response.data.data;
      setCartCount(cartData.totalItems);
      setShowCart(cartData.totalItems > 0);
    } catch (error) {
      console.error("Error loading cart count:", error);
    }
  };

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to section function
  const scrollToSection = (category) => {
    setActiveCategory(category);
    const element = sectionRefs[category].current;
    if (element) {
      const headerOffset = 130;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Add to cart function
  const handleAddToCart = async (product) => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        setSnackbar({
          open: true,
          message: "Please login to add items to cart",
          severity: "warning",
        });
        return;
      }

      await cartApi.addToCart(userId, product);

      // Update cart count
      setCartCount((prevCount) => prevCount + 1);
      setShowCart(true);

      // Show success message
      setSnackbar({
        open: true,
        message: `${product.name} added to cart!`,
        severity: "success",
      });

      // Reload cart count to get accurate count
      loadCartCount();
    } catch (error) {
      console.error("Error adding to cart:", error);
      setSnackbar({
        open: true,
        message: "Failed to add item to cart",
        severity: "error",
      });
    }
  };

  // Close snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div style={{ paddingTop: "64px", minHeight: "100vh" }}>
      <ShopHero />

      <CategoryNav
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSelect={scrollToSection}
      />

      {showCart && <CartFab count={cartCount} onClick={() => navigate("/cart")} />}

      {/* Products Sections */}
      <Container sx={{ py: 6 }}>
        {CATEGORIES.map((category) => (
          <ProductSection
            key={category.id}
            sectionRef={sectionRefs[category.id]}
            title={category.title}
            errorLabel={category.errorLabel}
            onAddToCart={handleAddToCart}
            {...productsByCategory[category.id]}
          />
        ))}
      </Container>

      {/* Scroll to top button */}
      {showScrollTop && (
        <Fab
          color="primary"
          aria-label="scroll back to top"
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            transition: "all 0.3s ease",
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      )}

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
