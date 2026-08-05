/**
 * Adjacency-list category tree. Roots are the 5 shop top-level categories; "bags" is the
 * only one with real subcategory data (BagProduct.category's enum) — the rest stay leaves
 * rather than inventing subcategories that don't exist in the catalog.
 */
module.exports = [
  { name: "power", parent: null },
  { name: "sleep", parent: null },
  { name: "bags", parent: null },
  { name: "rain", parent: null },
  { name: "security", parent: null },

  { name: "backpack", parent: "bags" },
  { name: "luggage", parent: "bags" },
  { name: "packing organizers", parent: "bags" },
  { name: "sling bag", parent: "bags" },
  { name: "toiletry bag", parent: "bags" },
  { name: "duffel bag", parent: "bags" },
  { name: "travel wallet", parent: "bags" },
  { name: "bag organizer", parent: "bags" },
];
