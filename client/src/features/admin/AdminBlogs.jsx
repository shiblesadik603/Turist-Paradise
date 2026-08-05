import { useEffect, useState } from "react";
import * as blogsApi from "../../api/blogs.api";
import { AdminLayout } from "./AdminLayout";

export const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    blogsApi
      .getBlogs()
      .then((response) => setBlogs(response.data.data))
      .catch(() => setError("Couldn't load blogs."))
      .finally(() => setLoaded(true));
  }, []);

  const handleDelete = async (blog) => {
    if (!window.confirm(`Delete "${blog.title}"? This can't be undone.`)) return;
    try {
      await blogsApi.deleteBlog(blog._id);
      setBlogs((prev) => prev.filter((b) => b._id !== blog._id));
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't delete blog.");
    }
  };

  return (
    <AdminLayout title="Blogs">
      {error && <div className="admin-error">{error}</div>}

      <div className="admin-table-wrap">
        {loaded && blogs.length === 0 ? (
          <div className="admin-empty">No blog posts yet.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Place</th>
                <th>Author</th>
                <th>Reactions</th>
                <th>Comments</th>
                <th>Posted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id}>
                  <td>{blog.title}</td>
                  <td>{blog.place || "—"}</td>
                  <td>{blog.authorName || "—"}</td>
                  <td>{blog.reactions?.length || 0}</td>
                  <td>{blog.comments?.length || 0}</td>
                  <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                  <td className="admin-table__actions">
                    <button
                      className="admin-btn admin-btn--danger"
                      onClick={() => handleDelete(blog)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
};
