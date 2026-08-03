/** Signup/login: hashes/verifies passwords with bcrypt and issues JWTs. */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const ApiError = require("../utils/ApiError");
const env = require("../config/env");

const SALT_ROUNDS = 10;
const TOKEN_EXPIRY = "7d";

const signToken = (userId) => jwt.sign({ userId }, env.jwtSecret, { expiresIn: TOKEN_EXPIRY });

const stripPassword = (userDoc) => {
  const { password: _password, ...rest } = userDoc.toObject();
  return rest;
};

const signup = async ({ name, email, password }) => {
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await UserModel.create({ name, email, password: hashedPassword });

  return {
    user: stripPassword(user),
    token: signToken(user._id),
  };
};

const login = async ({ email, password }) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ApiError(404, "No account found with this email");
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    throw new ApiError(401, "Incorrect password");
  }

  return {
    user: stripPassword(user),
    token: signToken(user._id),
  };
};

module.exports = { signup, login };
