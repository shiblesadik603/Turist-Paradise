const express = require("express");
const requireAuth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const { getUser, updateUser } = require("../controllers/users.controller");

const router = express.Router();

router.get("/:userId", requireAuth, getUser);
router.put("/:userId", requireAuth, upload.single("image"), updateUser);

module.exports = router;
