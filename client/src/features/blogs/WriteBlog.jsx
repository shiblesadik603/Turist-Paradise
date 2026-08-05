import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import * as blogsApi from "../../api/blogs.api";
import "./Blogs.css";

export const WriteBlog = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", place: "", content: "", imageUrl: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.place.trim() || !form.content.trim()) {
      setError("Please fill in the title, place, and your story.");
      return;
    }

    setSubmitting(true);
    setError(null);

    blogsApi
      .createBlog({
        title: form.title.trim(),
        place: form.place.trim(),
        content: form.content.trim(),
        imageUrl: form.imageUrl.trim() || null,
      })
      .then((response) => navigate(`/blogs/${response.data.data._id}`))
      .catch((err) => {
        console.error("Error creating blog:", err);
        setError("Failed to publish your blog. Please try again.");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="write-blog">
      <div className="write-blog__header">
        <Link to="/blogs" className="write-blog__back-link">
          <ArrowBackIcon fontSize="small" /> All blogs
        </Link>
        <h1>Write a Blog</h1>
        <p>
          Share a real trip — where you went, what surprised you, what you&apos;d tell a friend.
        </p>
      </div>

      <form className="write-blog__form" onSubmit={handleSubmit}>
        {error && <div className="write-blog__error">{error}</div>}

        <div className="write-blog__field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="e.g. Chasing Sunsets in Cox's Bazar"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="write-blog__field">
          <label htmlFor="place">Place</label>
          <input
            id="place"
            name="place"
            type="text"
            placeholder="e.g. Cox's Bazar Sea Beach"
            value={form.place}
            onChange={handleChange}
          />
        </div>

        <div className="write-blog__field">
          <label htmlFor="imageUrl">Cover image URL (optional)</label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            placeholder="https://..."
            value={form.imageUrl}
            onChange={handleChange}
          />
        </div>

        <div className="write-blog__field">
          <label htmlFor="content">Your story</label>
          <textarea
            id="content"
            name="content"
            placeholder="Tell us about the trip..."
            value={form.content}
            onChange={handleChange}
            rows={12}
          />
        </div>

        <button type="submit" className="write-blog__submit" disabled={submitting}>
          {submitting ? "Publishing..." : "Publish Blog"}
        </button>
      </form>
    </div>
  );
};
