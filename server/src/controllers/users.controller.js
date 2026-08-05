/** GET/PUT /users/:userId — profile read and update (incl. avatar upload via multer). Also admin user management. */
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const userService = require("../services/userService");

const getUser = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  res.status(200).json({ success: true, message: "User retrieved", data: user });
});

const updateUser = asyncHandler(async (req, res) => {
  const { name, phonenum, address } = req.body;
  const image = req.file ? req.file.filename : null;

  const updatedUser = await userService.updateUser(req.params.userId, {
    name,
    phonenum,
    address,
    image,
  });

  res.status(200).json({ success: true, message: "User updated", data: updatedUser });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).json({ success: true, message: "Users retrieved", data: users });
});

const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  if (!role) {
    throw new ApiError(400, "role is required");
  }

  const updatedUser = await userService.updateUserRole(req.params.userId, role, req.userId);
  res.status(200).json({ success: true, message: "Role updated", data: updatedUser });
});

const deleteUser = asyncHandler(async (req, res) => {
  await userService.deleteUser(req.params.userId, req.userId);
  res.status(200).json({ success: true, message: "User deleted", data: null });
});

module.exports = { getUser, updateUser, getAllUsers, updateUserRole, deleteUser };
