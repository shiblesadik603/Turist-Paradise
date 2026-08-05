/** Static OpenAPI 3.0 spec, served via swagger-ui-express at /api/docs. Kept in sync with the README's API reference table by hand. */

const envelope = (dataSchema) => ({
  type: "object",
  properties: {
    success: { type: "boolean" },
    message: { type: "string" },
    data: dataSchema,
  },
});

const bearerAuth = [{ bearerAuth: [] }];

const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Tourism Platform API",
    version: "1.0.0",
    description:
      "REST API for the Tourism Platform MERN app — auth, destinations, maps, AI trip planning, shop, cart, payments/orders, and blogs. Every response follows { success, message, data }.",
  },
  servers: [{ url: "/api/v1" }],
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
    },
    schemas: {
      Error: envelope({ type: "null" }),
    },
  },
  tags: [
    { name: "Auth" },
    { name: "Users" },
    { name: "Destinations" },
    { name: "Maps" },
    { name: "Planner" },
    { name: "Shop" },
    { name: "Cart" },
    { name: "Payment" },
    { name: "Orders" },
    { name: "Blogs" },
  ],
  paths: {
    "/auth/signup": {
      post: {
        tags: ["Auth"],
        summary: "Create an account",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                  name: { type: "string" },
                  email: { type: "string", format: "email" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Account created" },
          400: { description: "Validation error" },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Log in and receive a JWT",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", format: "email" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "{ user, token }" },
          401: { description: "Invalid credentials" },
        },
      },
    },
    "/users/{userId}": {
      get: {
        tags: ["Users"],
        summary: "Get a user's profile",
        security: bearerAuth,
        parameters: [{ name: "userId", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "User object" }, 404: { description: "Not found" } },
      },
      put: {
        tags: ["Users"],
        summary: "Update name/phone/address/photo",
        security: bearerAuth,
        parameters: [{ name: "userId", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  phonenum: { type: "string" },
                  address: { type: "string" },
                  image: { type: "string", format: "binary" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "Updated user" } },
      },
    },
    "/destinations": {
      get: {
        tags: ["Destinations"],
        summary: "List tourist spots",
        security: bearerAuth,
        responses: { 200: { description: "Tourist spot array" } },
      },
    },
    "/destinations/{slug}": {
      get: {
        tags: ["Destinations"],
        summary: "Get a destination's full detail page content",
        security: bearerAuth,
        parameters: [{ name: "slug", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Spot detail" }, 404: { description: "Not found" } },
      },
    },
    "/maps/places": {
      get: {
        tags: ["Maps"],
        summary: "Nearby hotels/restaurants/resorts via Overpass (OpenStreetMap)",
        security: bearerAuth,
        parameters: [
          { name: "location", in: "query", required: true, schema: { type: "string" } },
          { name: "radius", in: "query", schema: { type: "number" } },
          { name: "type", in: "query", schema: { type: "string" } },
        ],
        responses: { 200: { description: "Nearby-place result" } },
      },
    },
    "/planner": {
      post: {
        tags: ["Planner"],
        summary: "Save an AI-generated trip plan (rate-limited)",
        security: bearerAuth,
        responses: { 201: { description: "Saved plan" }, 429: { description: "Rate limited" } },
      },
    },
    "/planner/{userId}": {
      get: {
        tags: ["Planner"],
        summary: "List a user's saved trip plans",
        security: bearerAuth,
        parameters: [{ name: "userId", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Plan array" } },
      },
    },
    "/planner/{id}": {
      delete: {
        tags: ["Planner"],
        summary: "Delete a saved trip plan",
        security: bearerAuth,
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Deleted" } },
      },
    },
    "/shop/{category}": {
      get: {
        tags: ["Shop"],
        summary: "List products in a category",
        security: bearerAuth,
        parameters: [
          {
            name: "category",
            in: "path",
            required: true,
            schema: { type: "string", enum: ["power", "sleep", "bags", "rain", "security"] },
          },
        ],
        responses: { 200: { description: "Product array, each with a stock count" } },
      },
    },
    "/cart/add": {
      post: {
        tags: ["Cart"],
        summary: "Add a product to the cart",
        security: bearerAuth,
        responses: { 200: { description: "Updated cart" } },
      },
    },
    "/cart/{userId}": {
      get: {
        tags: ["Cart"],
        summary: "Get a user's cart",
        security: bearerAuth,
        parameters: [{ name: "userId", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "{ products, totalItems, totalPrice }" } },
      },
    },
    "/cart/update": {
      put: {
        tags: ["Cart"],
        summary: "Update a cart line item's quantity",
        security: bearerAuth,
        responses: { 200: { description: "Updated cart" } },
      },
    },
    "/cart/remove": {
      delete: {
        tags: ["Cart"],
        summary: "Remove a product from the cart",
        security: bearerAuth,
        responses: { 200: { description: "Updated cart" } },
      },
    },
    "/cart/clear/{userId}": {
      delete: {
        tags: ["Cart"],
        summary: "Empty a user's cart",
        security: bearerAuth,
        parameters: [{ name: "userId", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Cleared" } },
      },
    },
    "/payment/init": {
      post: {
        tags: ["Payment"],
        summary: "Create a pending Order and start an SSLCommerz sandbox session (rate-limited)",
        security: bearerAuth,
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["totalAmount", "userId", "cartItems"],
                properties: {
                  totalAmount: { type: "number" },
                  userId: { type: "string" },
                  cartItems: { type: "array", items: { type: "object" } },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "{ url } — SSLCommerz gateway URL" },
          429: { description: "Rate limited" },
        },
      },
    },
    "/payment/success": {
      post: {
        tags: ["Payment"],
        summary: "SSLCommerz success redirect — verifies and settles the order",
        description: "Called by the browser, not directly by API clients.",
        responses: { 302: { description: "Redirects to the frontend" } },
      },
    },
    "/payment/fail": {
      post: {
        tags: ["Payment"],
        summary: "SSLCommerz fail redirect",
        responses: { 302: { description: "Redirects to the frontend" } },
      },
    },
    "/payment/cancel": {
      post: {
        tags: ["Payment"],
        summary: "SSLCommerz cancel redirect",
        responses: { 302: { description: "Redirects to the frontend" } },
      },
    },
    "/payment/ipn": {
      post: {
        tags: ["Payment"],
        summary: "SSLCommerz server-to-server webhook — the authoritative settlement path",
        description: "Idempotent: settling an already-paid/failed/cancelled order is a no-op.",
        responses: { 200: { description: "IPN received" } },
      },
    },
    "/orders/{userId}": {
      get: {
        tags: ["Orders"],
        summary: "List a user's orders, newest first",
        security: bearerAuth,
        parameters: [{ name: "userId", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Order array" } },
      },
    },
    "/blogs": {
      get: {
        tags: ["Blogs"],
        summary: "List blog posts, newest first",
        security: bearerAuth,
        responses: { 200: { description: "Blog array" } },
      },
      post: {
        tags: ["Blogs"],
        summary: "Publish a blog post",
        security: bearerAuth,
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "place", "content"],
                properties: {
                  title: { type: "string" },
                  place: { type: "string" },
                  content: { type: "string" },
                  imageUrl: { type: "string" },
                },
              },
            },
          },
        },
        responses: { 201: { description: "Created blog" } },
      },
    },
    "/blogs/{id}": {
      get: {
        tags: ["Blogs"],
        summary: "Get one blog post with its comments",
        security: bearerAuth,
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Blog with comments" },
          404: { description: "Not found" },
        },
      },
      delete: {
        tags: ["Blogs"],
        summary: "Delete a blog post (author only)",
        security: bearerAuth,
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Deleted" }, 403: { description: "Not the author" } },
      },
    },
    "/blogs/{id}/react": {
      post: {
        tags: ["Blogs"],
        summary: "Toggle the current user's reaction on a blog post",
        security: bearerAuth,
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Blog with reaction toggled" } },
      },
    },
    "/blogs/{id}/comments": {
      post: {
        tags: ["Blogs"],
        summary: "Add a comment to a blog post",
        security: bearerAuth,
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["text"],
                properties: { text: { type: "string" } },
              },
            },
          },
        },
        responses: { 200: { description: "Blog with the new comment appended" } },
      },
    },
  },
};

module.exports = openApiSpec;
