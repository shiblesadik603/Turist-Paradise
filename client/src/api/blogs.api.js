import axiosClient from "./axiosClient";

export const getBlogs = () => axiosClient.get("/blogs");

export const getBlog = (id) => axiosClient.get(`/blogs/${id}`);

export const createBlog = (blog) => axiosClient.post("/blogs", blog);

export const reactToBlog = (id) => axiosClient.post(`/blogs/${id}/react`);

export const addComment = (id, text) => axiosClient.post(`/blogs/${id}/comments`, { text });

export const deleteBlog = (id) => axiosClient.delete(`/blogs/${id}`);
