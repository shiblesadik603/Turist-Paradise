/** GET/POST/DELETE /blogs — travel blog posts, reactions, and comments. */
const asyncHandler = require("../utils/asyncHandler");
const blogService = require("../services/blogService");
const userService = require("../services/userService");

const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await blogService.getAllBlogs();
  res.status(200).json({ success: true, message: "Blogs retrieved", data: blogs });
});

const getBlog = asyncHandler(async (req, res) => {
  const blog = await blogService.getBlogById(req.params.id);
  res.status(200).json({ success: true, message: "Blog retrieved", data: blog });
});

const createBlog = asyncHandler(async (req, res) => {
  const { title, place, content, imageUrl } = req.body;
  const author = await userService.getUserById(req.userId);
  const blog = await blogService.createBlog({
    title,
    place,
    content,
    imageUrl,
    authorId: req.userId,
    authorName: author.name,
  });
  res.status(201).json({ success: true, message: "Blog created", data: blog });
});

const reactToBlog = asyncHandler(async (req, res) => {
  const blog = await blogService.toggleReaction(req.params.id, req.userId);
  res.status(200).json({ success: true, message: "Reaction updated", data: blog });
});

const addComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const author = await userService.getUserById(req.userId);
  const blog = await blogService.addComment(req.params.id, {
    authorId: req.userId,
    authorName: author.name,
    text,
  });
  res.status(201).json({ success: true, message: "Comment added", data: blog });
});

const deleteBlog = asyncHandler(async (req, res) => {
  await blogService.deleteBlog(req.params.id, req.userId, req.userRole);
  res.status(200).json({ success: true, message: "Blog deleted", data: null });
});

module.exports = { getBlogs, getBlog, createBlog, reactToBlog, addComment, deleteBlog };
