const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    authorId: { type: String, default: null },
    authorName: String,
    text: String,
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const blogSchema = new mongoose.Schema(
  {
    title: String,
    place: String,
    content: String,
    imageUrl: { type: String, default: null },
    authorId: { type: String, default: null },
    authorName: String,
    reactions: { type: [String], default: [] },
    comments: { type: [commentSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
