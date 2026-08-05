const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const UserSchema = new mongoose.Schema(
  {
    uniqueid: {
      type: String,
      default: uuidv4, // Automatically generate a unique ID
      unique: true, // Ensure it's unique in the collection
      index: true, // Make it the primary key by indexing it
    },
    name: String,
    email: { type: String, unique: true },
    // null for accounts created via Google sign-in — they authenticate with Google, not a password.
    password: { type: String, default: null },
    phonenum: { type: String, default: null },
    address: { type: String, default: null },
    image: { type: String, default: null },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    authProvider: { type: String, enum: ["local", "google"], default: "local" },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
