import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const excerptOf = (content, length = 160) =>
  content.length > length ? `${content.slice(0, length).trim()}…` : content;

/** A single blog tile in the Blogs listing grid. */
export const BlogCard = ({ blog }) => (
  <Link to={`/blogs/${blog._id}`} className="blog-card">
    {blog.imageUrl ? (
      <img src={blog.imageUrl} alt="" className="blog-card__image" />
    ) : (
      <div className="blog-card__image blog-card__image--placeholder">{blog.place}</div>
    )}
    <div className="blog-card__body">
      <span className="blog-card__place">{blog.place}</span>
      <h3 className="blog-card__title">{blog.title}</h3>
      <p className="blog-card__excerpt">{excerptOf(blog.content)}</p>
      <div className="blog-card__meta">
        <span className="blog-card__author">By {blog.authorName}</span>
        <span className="blog-card__stats">
          <FavoriteIcon fontSize="inherit" /> {blog.reactions.length}
          <ChatBubbleOutlineIcon fontSize="inherit" /> {blog.comments.length}
        </span>
      </div>
    </div>
  </Link>
);
