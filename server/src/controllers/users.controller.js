/** GET/PUT /users/:userId — profile read and update (incl. avatar upload via multer). */
const asyncHandler = require("../utils/asyncHandler");
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

module.exports = { getUser, updateUser };
