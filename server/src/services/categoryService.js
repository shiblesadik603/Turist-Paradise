/** Adjacency-list category tree (Category.parentId) + DFS traversal for "related items". */
const Category = require("../models/Category");
const ApiError = require("../utils/ApiError");
const shopService = require("./shopService");

/** Depth-first: builds a nested tree from the flat parentId list, starting at the given parent (null = roots). */
const buildTree = (flatCategories, parentId = null) =>
  flatCategories
    .filter((c) => String(c.parentId || null) === String(parentId))
    .map((c) => ({
      id: c._id,
      name: c.name,
      children: buildTree(flatCategories, c._id),
    }));

const getTree = async () => {
  const flatCategories = await Category.find();
  return buildTree(flatCategories);
};

/** DFS: every id in the subtree rooted at nodeId, nodeId included. */
const collectSubtreeIds = async (nodeId) => {
  const ids = [nodeId];
  const children = await Category.find({ parentId: nodeId });
  for (const child of children) {
    ids.push(...(await collectSubtreeIds(child._id)));
  }
  return ids;
};

/**
 * "Related items" for a product: if it belongs to a subcategory (currently only bags
 * products do), climb to that subcategory's parent and DFS back down — so a backpack's
 * related items are other bags across every subcategory, not just other backpacks. For
 * products with no subcategory data, falls back to other items in the same collection.
 */
const getRelatedProducts = async (productId, limit = 6) => {
  const found = await shopService.findProductById(productId);
  if (!found) {
    throw new ApiError(404, "Product not found");
  }

  const nodeName = found.product.category || found.category;
  const node = await Category.findOne({ name: nodeName });

  const startNode = node?.parentId ? await Category.findById(node.parentId) : node;

  if (!startNode) {
    return found.Model.find({ id: { $ne: productId } }).limit(limit);
  }

  const subtreeIds = await collectSubtreeIds(startNode._id);
  const subtreeCategories = (await Category.find({ _id: { $in: subtreeIds } })).map((c) => c.name);

  const query = found.product.category
    ? { category: { $in: subtreeCategories }, id: { $ne: productId } }
    : { id: { $ne: productId } };

  return found.Model.find(query).limit(limit);
};

module.exports = { getTree, getRelatedProducts };
