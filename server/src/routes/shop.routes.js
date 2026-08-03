const express = require("express");
const requireAuth = require("../middleware/auth.middleware");
const {
  getPowerProducts,
  getSleepProducts,
  getBagProducts,
  getRainProducts,
  getSecurityProducts,
} = require("../controllers/shop.controller");

const router = express.Router();

router.get("/power", requireAuth, getPowerProducts);
router.get("/sleep", requireAuth, getSleepProducts);
router.get("/bags", requireAuth, getBagProducts);
router.get("/rain", requireAuth, getRainProducts);
router.get("/security", requireAuth, getSecurityProducts);

module.exports = router;
