/** GET /shop/:category — one handler per product category, all built from the same factory. */
const asyncHandler = require("../utils/asyncHandler");
const shopService = require("../services/shopService");

const getProductsByCategory = (category, label) =>
  asyncHandler(async (req, res) => {
    const products = await shopService.getProductsByCategory(category);
    res.status(200).json({ success: true, message: `${label} products retrieved`, data: products });
  });

module.exports = {
  getPowerProducts: getProductsByCategory("power", "Power"),
  getSleepProducts: getProductsByCategory("sleep", "Sleep"),
  getBagProducts: getProductsByCategory("bags", "Bag"),
  getRainProducts: getProductsByCategory("rain", "Rain protection"),
  getSecurityProducts: getProductsByCategory("security", "Security"),
};
