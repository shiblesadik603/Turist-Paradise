const express = require("express");
const requireAuth = require("../middleware/auth.middleware");
const requireRole = require("../middleware/requireRole.middleware");
const {
  getPowerProducts,
  getSleepProducts,
  getBagProducts,
  getRainProducts,
  getSecurityProducts,
  updateStock,
  getCategoryTree,
  getRelatedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/shop.controller");

const router = express.Router();

router.get("/power", requireAuth, getPowerProducts);
router.get("/sleep", requireAuth, getSleepProducts);
router.get("/bags", requireAuth, getBagProducts);
router.get("/rain", requireAuth, getRainProducts);
router.get("/security", requireAuth, getSecurityProducts);
router.patch("/:productId/stock", requireAuth, requireRole("admin"), updateStock);
router.get("/categories", requireAuth, getCategoryTree);
router.get("/products/:productId/related", requireAuth, getRelatedProducts);
router.post("/:category", requireAuth, requireRole("admin"), createProduct);
router.put("/:productId", requireAuth, requireRole("admin"), updateProduct);
router.delete("/:productId", requireAuth, requireRole("admin"), deleteProduct);

module.exports = router;
