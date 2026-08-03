/** Add/update/remove items in a user's cart, keyed by userId. */
const CartProduct = require("../models/CartProduct");
const ApiError = require("../utils/ApiError");

const addToCart = async ({ userId, product }) => {
  if (!userId || !product) {
    throw new ApiError(400, "UserId and product are required");
  }

  let userCart = await CartProduct.findOne({ userId });

  if (userCart) {
    const existingProductIndex = userCart.products.findIndex(
      (p) => p.productId.toString() === product.id.toString()
    );

    if (existingProductIndex > -1) {
      userCart.products[existingProductIndex].quantity += 1;
    } else {
      userCart.products.push({
        productId: product.id,
        name: product.name,
        price: parseFloat(product.price.replace("$", "")),
        image: product.image,
        description: product.description || "",
        quantity: 1,
      });
    }

    userCart.updatedAt = new Date();
    await userCart.save();
  } else {
    userCart = new CartProduct({
      userId,
      products: [
        {
          productId: product.id,
          name: product.name,
          price: parseFloat(product.price.replace("$", "")),
          image: product.image,
          description: product.description || "",
          quantity: 1,
        },
      ],
    });

    await userCart.save();
  }

  return userCart;
};

const getCart = async (userId) => {
  const userCart = await CartProduct.findOne({ userId });

  if (!userCart) {
    return { products: [], totalItems: 0, totalPrice: 0 };
  }

  const totalItems = userCart.products.reduce((sum, product) => sum + product.quantity, 0);
  const totalPrice = userCart.products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return {
    products: userCart.products,
    totalItems,
    totalPrice: totalPrice.toFixed(2),
    createdAt: userCart.createdAt,
    updatedAt: userCart.updatedAt,
  };
};

const updateCartItem = async ({ userId, productId, quantity }) => {
  if (!userId || !productId || quantity < 1) {
    throw new ApiError(400, "Invalid parameters");
  }

  const userCart = await CartProduct.findOne({ userId });
  if (!userCart) {
    throw new ApiError(404, "Cart not found");
  }

  const productIndex = userCart.products.findIndex(
    (p) => p.productId.toString() === productId.toString()
  );
  if (productIndex === -1) {
    throw new ApiError(404, "Product not found in cart");
  }

  userCart.products[productIndex].quantity = quantity;
  userCart.updatedAt = new Date();
  await userCart.save();

  return userCart;
};

const removeFromCart = async ({ userId, productId }) => {
  if (!userId || !productId) {
    throw new ApiError(400, "UserId and productId are required");
  }

  const userCart = await CartProduct.findOne({ userId });
  if (!userCart) {
    throw new ApiError(404, "Cart not found");
  }

  userCart.products = userCart.products.filter(
    (p) => p.productId.toString() !== productId.toString()
  );
  userCart.updatedAt = new Date();
  await userCart.save();

  return userCart;
};

const clearCart = (userId) => CartProduct.findOneAndDelete({ userId });

module.exports = { addToCart, getCart, updateCartItem, removeFromCart, clearCart };
