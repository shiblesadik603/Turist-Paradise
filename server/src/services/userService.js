/** Reads and updates a user's profile fields, plus admin user management. */
const UserModel = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const CartProduct = require("../models/CartProduct");
const ApiError = require("../utils/ApiError");

const getUserById = async (userId) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return user;
};

const updateUser = async (userId, { name, phonenum, address, image }) => {
  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    { name, phonenum, address, image },
    { new: true }
  );
  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }
  return updatedUser;
};

/** Admin-only: every account, newest first, password never included. */
const getAllUsers = () => UserModel.find().select("-password").sort("-createdAt");

/** Admin-only: promote/demote a role. Refuses to let an admin change their own role — avoids accidental self-lockout. */
const updateUserRole = async (userId, role, requestingUserId) => {
  if (userId === requestingUserId) {
    throw new ApiError(400, "You can't change your own role");
  }
  if (!["customer", "admin"].includes(role)) {
    throw new ApiError(400, "role must be 'customer' or 'admin'");
  }

  const updatedUser = await UserModel.findByIdAndUpdate(userId, { role }, { new: true }).select(
    "-password"
  );
  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }
  return updatedUser;
};

/** Admin-only: deletes the account plus its sessions/cart. Orders, blogs, and trip plans are left as historical records. */
const deleteUser = async (userId, requestingUserId) => {
  if (userId === requestingUserId) {
    throw new ApiError(400, "You can't delete your own account");
  }

  const deletedUser = await UserModel.findByIdAndDelete(userId);
  if (!deletedUser) {
    throw new ApiError(404, "User not found");
  }

  await Promise.all([RefreshToken.deleteMany({ userId }), CartProduct.deleteOne({ userId })]);
};

module.exports = {
  getUserById,
  updateUser,
  getAllUsers,
  updateUserRole,
  deleteUser,
};
