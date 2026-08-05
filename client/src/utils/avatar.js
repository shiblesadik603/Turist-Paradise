/** Avatars are now full Cloudinary URLs. Falls back to the old local-upload path for accounts with a pre-migration image value. */
export const resolveAvatarUrl = (image) => {
  if (!image) return null;
  if (/^https?:\/\//i.test(image)) return image;
  return `${import.meta.env.VITE_BACKEND_URL}/uploads/${image}`;
};
