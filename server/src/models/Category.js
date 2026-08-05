const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  // Matches either a shop top-level category key ("power", "bags", ...) or, for
  // subcategories, a product's own `category` field value (e.g. "backpack").
  name: { type: String, required: true, unique: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
});

const Category = mongoose.model("Category", categorySchema, "categories");

module.exports = Category;
