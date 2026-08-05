/** Multer config for avatar uploads: streams straight to Cloudinary so files survive redeploys on hosts with an ephemeral filesystem. */
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary, isCloudinaryConfigured } = require("../config/cloudinary");
const ApiError = require("../utils/ApiError");

const storage = isCloudinaryConfigured
  ? new CloudinaryStorage({
      cloudinary,
      params: { folder: "tourism-app/avatars" },
    })
  : multer.memoryStorage();

const upload = multer({ storage });

/** Rejects avatar uploads with a clear error instead of a confusing failure when Cloudinary isn't configured. */
const requireCloudinary = (req, res, next) => {
  if (req.file && !isCloudinaryConfigured) {
    return next(
      new ApiError(
        503,
        "Avatar uploads are unavailable — CLOUDINARY_CLOUD_NAME/API_KEY/API_SECRET are not set."
      )
    );
  }
  next();
};

module.exports = Object.assign(upload, { requireCloudinary });
