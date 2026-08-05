/** GET /shop/:category — one handler per product category, all built from the same factory. Also PATCH /shop/:productId/stock (admin only). */
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const shopService = require("../services/shopService");

const getProductsByCategory = (category, label) =>
  asyncHandler(async (req, res) => {
    const products = await shopService.getProductsByCategory(category);
    res.status(200).json({ success: true, message: `${label} products retrieved`, data: products });
  });

const updateStock = asyncHandler(async (req, res) => {
  const { stock } = req.body;
  if (typeof stock !== "number") {
    throw new ApiError(400, "stock (number) is required");
  }

  const product = await shopService.updateProductStock(req.params.productId, stock);
  res.status(200).json({ success: true, message: "Stock updated", data: product });
});

module.exports = {
  getPowerProducts: getProductsByCategory("power", "Power"),
  getSleepProducts: getProductsByCategory("sleep", "Sleep"),
  getBagProducts: getProductsByCategory("bags", "Bag"),
  getRainProducts: getProductsByCategory("rain", "Rain protection"),
  getSecurityProducts: getProductsByCategory("security", "Security"),
  updateStock,
};
