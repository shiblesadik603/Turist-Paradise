import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SendIcon from "@mui/icons-material/Send";
import * as blogsApi from "../../api/blogs.api";
import { getUserId } from "../../utils/authStorage";
import "./Blogs.css";

const formatDate = (isoString) =>
  new Date(isoString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = getUserId();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reacting, setReacting] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    blogsApi
      .getBlog(id)
      .then((response) => setBlog(response.data.data))
      .catch((err) => {
        console.error(err);
        setError("We couldn't find that blog. It may have been removed.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleReact = () => {
    setReacting(true);
    blogsApi
      .reactToBlog(id)
      .then((response) => setBlog(response.data.data))
      .catch((err) => console.error("Error reacting to blog:", err))
      .finally(() => setReacting(false));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setSubmittingComment(true);
    blogsApi
      .addComment(id, commentText.trim())
      .then((response) => {
        setBlog(response.data.data);
        setCommentText("");
      })
      .catch((err) => console.error("Error adding comment:", err))
      .finally(() => setSubmittingComment(false));
  };

  const handleDelete = () => {
    if (!window.confirm("Delete this blog? This can't be undone.")) return;
    blogsApi
      .deleteBlog(id)
      .then(() => navigate("/blogs"))
      .catch((err) => console.error("Error deleting blog:", err));
  };

  if (loading) {
    return (
      <div className="blogs-status" style={{ minHeight: "60vh", paddingTop: "120px" }}>
        <div className="blogs-status__spinner" />
        Loading blog...
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="blogs-status" style={{ minHeight: "60vh", paddingTop: "120px" }}>
        <p>{error}</p>
        <Link to="/blogs" className="blog-detail__back-link">
          <ArrowBackIcon fontSize="small" /> Back to blogs
        </Link>
      </div>
    );
  }

  const hasReacted = blog.reactions.includes(userId);
  const isOwnBlog = blog.authorId === userId;
  const paragraphs = blog.content.split("\n\n");

  return (
    <div className="blog-detail">
      <div className="blog-detail__hero">
        {blog.imageUrl && <img src={blog.imageUrl} alt="" className="blog-detail__hero-bg" />}
        <div className="blog-detail__hero-scrim" />
        <div className="blog-detail__hero-content">
          <Link to="/blogs" className="blog-detail__back-link">
            <ArrowBackIcon fontSize="small" /> All blogs
          </Link>
          <span className="blog-detail__eyebrow">{blog.place}</span>
          <h1>{blog.title}</h1>
          <p className="blog-detail__byline">
            By {blog.authorName} · {formatDate(blog.createdAt)}
          </p>
        </div>
      </div>

      <div className="blog-detail__body">
        <div className="blog-detail__content">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="blog-detail__actions">
          <button
            type="button"
            className={`blog-detail__react ${hasReacted ? "blog-detail__react--active" : ""}`}
            onClick={handleReact}
            disabled={reacting}
          >
            {hasReacted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            {blog.reactions.length} {blog.reactions.length === 1 ? "Reaction" : "Reactions"}
          </button>
          <span className="blog-detail__comment-count">
            <ChatBubbleOutlineIcon fontSize="small" /> {blog.comments.length}{" "}
            {blog.comments.length === 1 ? "Comment" : "Comments"}
          </span>

          {isOwnBlog && (
            <button type="button" className="blog-detail__delete" onClick={handleDelete}>
              <DeleteOutlineIcon fontSize="small" /> Delete
            </button>
          )}
        </div>

        <section className="blog-detail__comments">
          <h2>Comments</h2>

          <form className="comment-form" onSubmit={handleAddComment}>
            <textarea
              placeholder="Share your thoughts on this trip..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={3}
            />
            <button type="submit" disabled={submittingComment || !commentText.trim()}>
              <SendIcon fontSize="small" /> {submittingComment ? "Posting..." : "Post Comment"}
            </button>
          </form>

          {blog.comments.length === 0 ? (
            <p className="blog-detail__no-comments">
              No comments yet — be the first to share your thoughts.
            </p>
          ) : (
            <ul className="comment-list">
              {[...blog.comments].reverse().map((comment) => (
                <li key={comment._id} className="comment-item">
                  <div className="comment-item__header">
                    <strong>{comment.authorName}</strong>
                    <span>{formatDate(comment.createdAt)}</span>
                  </div>
                  <p>{comment.text}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};
