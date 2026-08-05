const express = require("express");
const requireAuth = require("../middleware/auth.middleware");
const {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cart.controller");

const router = express.Router();

router.post("/add", requireAuth, addToCart);
router.get("/:userId", requireAuth, getCart);
router.put("/update", requireAuth, updateCartItem);
router.delete("/remove", requireAuth, removeFromCart);
router.delete("/clear/:userId", requireAuth, clearCart);

module.exports = router;
