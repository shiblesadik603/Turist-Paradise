const express = require("express");
const requireAuth = require("../middleware/auth.middleware");
const requireRole = require("../middleware/requireRole.middleware");
const upload = require("../middleware/upload.middleware");
const {
  getUser,
  updateUser,
  getAllUsers,
  updateUserRole,
  deleteUser,
} = require("../controllers/users.controller");

const router = express.Router();

router.get("/", requireAuth, requireRole("admin"), getAllUsers);
router.get("/:userId", requireAuth, getUser);
router.put("/:userId", requireAuth, upload.single("image"), updateUser);
router.patch("/:userId/role", requireAuth, requireRole("admin"), updateUserRole);
router.delete("/:userId", requireAuth, requireRole("admin"), deleteUser);

module.exports = router;
