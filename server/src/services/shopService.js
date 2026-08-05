/** Reads the shop product catalog, grouped by category. */
const PowerProduct = require("../models/PowerProduct");
const SleepProduct = require("../models/SleepProduct");
const BagProduct = require("../models/BagProduct");
const RainProduct = require("../models/RainProduct");
const SecurityProduct = require("../models/SecurityProduct");
const ApiError = require("../utils/ApiError");

const modelsByCategory = {
  power: PowerProduct,
  sleep: SleepProduct,
  bags: BagProduct,
  rain: RainProduct,
  security: SecurityProduct,
};

const getProductsByCategory = (category) => modelsByCategory[category].find();

/** Finds a product by its catalog id, searching every category (cart items don't carry a category). */
const findProductById = async (productId) => {
  for (const Model of Object.values(modelsByCategory)) {
    const product = await Model.findOne({ id: productId });
    if (product) {
      return { Model, product };
    }
  }
  return null;
};

/** Admin-only: sets a product's stock directly (e.g. restocking). */
const updateProductStock = async (productId, stock) => {
  if (!Number.isInteger(stock) || stock < 0) {
    throw new ApiError(400, "stock must be a non-negative integer");
  }

  const found = await findProductById(productId);
  if (!found) {
    throw new ApiError(404, "Product not found");
  }

  found.product.stock = stock;
  await found.product.save();
  return found.product;
};

module.exports = { modelsByCategory, getProductsByCategory, findProductById, updateProductStock };
