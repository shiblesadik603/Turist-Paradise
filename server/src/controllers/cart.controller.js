const asyncHandler = require("../utils/asyncHandler");
const cartService = require("../services/cartService");

const addToCart = asyncHandler(async (req, res) => {
  const cart = await cartService.addToCart(req.body);
  res.status(200).json({ success: true, message: "Product added to cart successfully", data: cart });
});

const getCart = asyncHandler(async (req, res) => {
  const cart = await cartService.getCart(req.params.userId);
  res.status(200).json({ success: true, message: "Cart retrieved", data: cart });
});

const updateCartItem = asyncHandler(async (req, res) => {
  const cart = await cartService.updateCartItem(req.body);
  res.status(200).json({ success: true, message: "Cart updated successfully", data: cart });
});

const removeFromCart = asyncHandler(async (req, res) => {
  const cart = await cartService.removeFromCart(req.body);
  res.status(200).json({ success: true, message: "Product removed from cart successfully", data: cart });
});

const clearCart = asyncHandler(async (req, res) => {
  await cartService.clearCart(req.params.userId);
  res.status(200).json({ success: true, message: "Cart cleared successfully", data: null });
});

module.exports = { addToCart, getCart, updateCartItem, removeFromCart, clearCart };
