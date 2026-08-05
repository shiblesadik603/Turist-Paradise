/** CRUD + reactions/comments for user-written travel blogs. */
const BlogModel = require("../models/Blog");
const ApiError = require("../utils/ApiError");
const { emitBlogUpdate } = require("../socket");

const getAllBlogs = () => BlogModel.find().sort({ createdAt: -1 });

const getBlogById = async (id) => {
  const blog = await BlogModel.findById(id);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }
  return blog;
};

const createBlog = ({ title, place, content, imageUrl, authorId, authorName }) =>
  new BlogModel({ title, place, content, imageUrl, authorId, authorName }).save();

const toggleReaction = async (blogId, userId) => {
  const blog = await getBlogById(blogId);
  const index = blog.reactions.indexOf(userId);
  if (index === -1) {
    blog.reactions.push(userId);
  } else {
    blog.reactions.splice(index, 1);
  }
  await blog.save();
  emitBlogUpdate(blogId, blog);
  return blog;
};

const addComment = async (blogId, { authorId, authorName, text }) => {
  const blog = await getBlogById(blogId);
  blog.comments.push({ authorId, authorName, text });
  await blog.save();
  emitBlogUpdate(blogId, blog);
  return blog;
};

const deleteBlog = async (blogId, userId, role) => {
  const blog = await getBlogById(blogId);
  if (blog.authorId !== userId && role !== "admin") {
    throw new ApiError(403, "You can only delete your own blog");
  }
  await BlogModel.findByIdAndDelete(blogId);
};

module.exports = { getAllBlogs, getBlogById, createBlog, toggleReaction, addComment, deleteBlog };
