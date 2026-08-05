import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as blogsApi from "../../api/blogs.api";
import { BlogCard } from "./BlogCard";
import "./Blogs.css";

export const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    blogsApi
      .getBlogs()
      .then((response) => setBlogs(response.data.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load blogs. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="blogs-page">
      <div className="blogs-hero">
        <img src="/photos/travel-journal.jpeg" alt="" className="blogs-hero__bg" />
        <div className="blogs-hero__scrim" />
        <div className="blogs-hero__content">
          <span className="blogs-hero__eyebrow">Traveler Stories</span>
          <h1>Blogs</h1>
          <p>Real trips, written by real travelers. Share yours, or get inspired by theirs.</p>
          <Link to="/blogs/new" className="blogs-hero__cta">
            Write a Blog
          </Link>
        </div>
      </div>

      <div className="blogs-body">
        {loading && (
          <div className="blogs-status">
            <div className="blogs-status__spinner" />
            Loading blogs...
          </div>
        )}

        {error && <p className="blogs-status blogs-status--error">{error}</p>}

        {!loading && !error && blogs.length === 0 && (
          <p className="blogs-status">No blogs yet — be the first to share your trip.</p>
        )}

        {!loading && !error && blogs.length > 0 && (
          <div className="blogs-grid">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
