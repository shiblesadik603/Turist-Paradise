/** GET /shop/:category — one handler per product category, all built from the same factory. Also PATCH /shop/:productId/stock (admin only), the category tree, and related-items. */
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const shopService = require("../services/shopService");
const categoryService = require("../services/categoryService");

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

const getCategoryTree = asyncHandler(async (req, res) => {
  const tree = await categoryService.getTree();
  res.status(200).json({ success: true, message: "Category tree retrieved", data: tree });
});

const getRelatedProducts = asyncHandler(async (req, res) => {
  const products = await categoryService.getRelatedProducts(req.params.productId);
  res.status(200).json({ success: true, message: "Related products retrieved", data: products });
});

const createProduct = asyncHandler(async (req, res) => {
  const product = await shopService.createProduct(req.params.category, req.body);
  res.status(201).json({ success: true, message: "Product created", data: product });
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await shopService.updateProduct(req.params.productId, req.body);
  res.status(200).json({ success: true, message: "Product updated", data: product });
});

const deleteProduct = asyncHandler(async (req, res) => {
  await shopService.deleteProduct(req.params.productId);
  res.status(200).json({ success: true, message: "Product deleted", data: null });
});

module.exports = {
  getPowerProducts: getProductsByCategory("power", "Power"),
  getSleepProducts: getProductsByCategory("sleep", "Sleep"),
  getBagProducts: getProductsByCategory("bags", "Bag"),
  getRainProducts: getProductsByCategory("rain", "Rain protection"),
  getSecurityProducts: getProductsByCategory("security", "Security"),
  updateStock,
  getCategoryTree,
  getRelatedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
