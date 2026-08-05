/** Reads the shop product catalog, grouped by category. */
const PowerProduct = require("../models/PowerProduct");
const SleepProduct = require("../models/SleepProduct");
const BagProduct = require("../models/BagProduct");
const RainProduct = require("../models/RainProduct");
const SecurityProduct = require("../models/SecurityProduct");
const ApiError = require("../utils/ApiError");
const cacheService = require("./cacheService");

const modelsByCategory = {
  power: PowerProduct,
  sleep: SleepProduct,
  bags: BagProduct,
  rain: RainProduct,
  security: SecurityProduct,
};

const CACHE_TTL_SECONDS = 300; // 5 min

const cacheKey = (category) => `shop:${category}`;

const getProductsByCategory = async (category) => {
  const cached = await cacheService.get(cacheKey(category));
  if (cached) return cached;

  const products = await modelsByCategory[category].find();
  await cacheService.set(cacheKey(category), products, CACHE_TTL_SECONDS);
  return products;
};

/** Finds a product by its catalog id, searching every category (cart items don't carry a category). */
const findProductById = async (productId) => {
  for (const [category, Model] of Object.entries(modelsByCategory)) {
    const product = await Model.findOne({ id: productId });
    if (product) {
      return { Model, product, category };
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
  await invalidateCategoryCache(found.category);
  return found.product;
};

const invalidateCategoryCache = (category) => cacheService.del(cacheKey(category));

/** Admin-only: fields shared by every category schema — see server/src/models/*Product.js. */
const EDITABLE_FIELDS = ["product_name", "price", "stock", "description", "img_url"];

const pickEditableFields = (data) =>
  EDITABLE_FIELDS.reduce((fields, key) => {
    if (data[key] !== undefined) fields[key] = data[key];
    return fields;
  }, {});

/** Converts a Mongoose duplicate-key/validation error into a clear 400 instead of leaking a raw 500. */
const asApiError = (err, duplicateMessage) => {
  if (err.code === 11000) {
    return new ApiError(400, duplicateMessage);
  }
  if (err.name === "ValidationError") {
    return new ApiError(400, err.message);
  }
  return err;
};

/** Admin-only: creates a product in the given category. `category` sub-field (the bags enum) is only meaningful for the "bags" collection — Mongoose ignores it for the others. */
const createProduct = async (category, data) => {
  const Model = modelsByCategory[category];
  if (!Model) {
    throw new ApiError(400, `Unknown category "${category}"`);
  }

  const fields = { ...pickEditableFields(data), id: data.id };
  if (category === "bags") {
    fields.category = data.category;
  }

  if (
    !fields.id ||
    !fields.product_name ||
    !fields.price ||
    !fields.description ||
    !fields.img_url
  ) {
    throw new ApiError(400, "id, product_name, price, description, and img_url are required");
  }
  if (category === "bags" && !fields.category) {
    throw new ApiError(400, "category is required for bags products");
  }

  try {
    const product = await Model.create(fields);
    await invalidateCategoryCache(category);
    return product;
  } catch (err) {
    throw asApiError(err, `A product with id "${fields.id}" already exists`);
  }
};

/** Admin-only: updates the fields shared across every category schema (plus `category` for bags). */
const updateProduct = async (productId, data) => {
  const found = await findProductById(productId);
  if (!found) {
    throw new ApiError(404, "Product not found");
  }

  const fields = pickEditableFields(data);
  if (found.category === "bags" && data.category !== undefined) {
    fields.category = data.category;
  }

  Object.assign(found.product, fields);
  try {
    await found.product.save();
  } catch (err) {
    throw asApiError(err, `A product with id "${productId}" already exists`);
  }
  await invalidateCategoryCache(found.category);
  return found.product;
};

/** Admin-only: deletes a product from whichever category collection it lives in. */
const deleteProduct = async (productId) => {
  const found = await findProductById(productId);
  if (!found) {
    throw new ApiError(404, "Product not found");
  }

  await found.Model.deleteOne({ id: productId });
  await invalidateCategoryCache(found.category);
};

module.exports = {
  modelsByCategory,
  getProductsByCategory,
  findProductById,
  updateProductStock,
  invalidateCategoryCache,
  createProduct,
  updateProduct,
  deleteProduct,
};
