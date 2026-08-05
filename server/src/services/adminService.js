/** Dashboard aggregates for the admin panel. */
const UserModel = require("../models/User");
const Order = require("../models/Order");
const BlogModel = require("../models/Blog");
const TouristSpotModel = require("../models/TouristSpot");
const { modelsByCategory } = require("./shopService");

const getStats = async () => {
  const [userCount, orderAgg, blogCount, spotCount, productCounts] = await Promise.all([
    UserModel.countDocuments(),
    Order.aggregate([
      { $match: { status: "paid" } },
      { $group: { _id: null, count: { $sum: 1 }, revenueCents: { $sum: "$totalCents" } } },
    ]),
    BlogModel.countDocuments(),
    TouristSpotModel.countDocuments(),
    Promise.all(
      Object.entries(modelsByCategory).map(async ([category, Model]) => [
        category,
        await Model.countDocuments(),
      ])
    ),
  ]);

  const { count: orderCount = 0, revenueCents = 0 } = orderAgg[0] || {};
  const productTotal = productCounts.reduce((sum, [, count]) => sum + count, 0);

  return {
    userCount,
    orderCount,
    revenueCents,
    blogCount,
    spotCount,
    productCount: productTotal,
    productsByCategory: Object.fromEntries(productCounts),
  };
};

module.exports = { getStats };
