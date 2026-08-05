/** GET /admin/stats — dashboard aggregates. Router-level middleware already restricts this whole path to admins. */
const asyncHandler = require("../utils/asyncHandler");
const adminService = require("../services/adminService");

const getStats = asyncHandler(async (req, res) => {
  const stats = await adminService.getStats();
  res.status(200).json({ success: true, message: "Stats retrieved", data: stats });
});

module.exports = { getStats };
