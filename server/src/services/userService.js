const UserModel = require("../models/User");
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

module.exports = { getUserById, updateUser };
