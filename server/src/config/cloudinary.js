/** Cloudinary SDK config for avatar uploads — optional, mirrors the Google/Gemini "degrade with a clear error" pattern. */
const cloudinary = require("cloudinary").v2;
const env = require("./env");

const isConfigured = Boolean(
  env.cloudinaryCloudName && env.cloudinaryApiKey && env.cloudinaryApiSecret
);

if (isConfigured) {
  cloudinary.config({
    cloud_name: env.cloudinaryCloudName,
    api_key: env.cloudinaryApiKey,
    api_secret: env.cloudinaryApiSecret,
  });
}

module.exports = { cloudinary, isCloudinaryConfigured: isConfigured };
