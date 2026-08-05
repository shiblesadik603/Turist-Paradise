const express = require("express");
const requireAuth = require("../middleware/auth.middleware");
const {
  getBlogs,
  getBlog,
  createBlog,
  reactToBlog,
  addComment,
  deleteBlog,
} = require("../controllers/blogs.controller");

const router = express.Router();

router.get("/", requireAuth, getBlogs);
router.get("/:id", requireAuth, getBlog);
router.post("/", requireAuth, createBlog);
router.post("/:id/react", requireAuth, reactToBlog);
router.post("/:id/comments", requireAuth, addComment);
router.delete("/:id", requireAuth, deleteBlog);

module.exports = router;
