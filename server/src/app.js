const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const swaggerUi = require("swagger-ui-express");

const apiRoutes = require("./routes");
const openApiSpec = require("./docs/openapi");
const { notFound, errorHandler } = require("./middleware/error.middleware");

const app = express();

// crossOriginResourcePolicy is relaxed because the frontend (a different origin/port)
// loads images directly from /uploads. contentSecurityPolicy is off because this app
// serves no HTML of its own except swagger-ui-express's bundled inline scripts/styles —
// every other response is JSON, so CSP has nothing meaningful left to protect.
app.use(
  helmet({ crossOriginResourcePolicy: { policy: "cross-origin" }, contentSecurityPolicy: false })
);
app.use(express.json());
// SSLCommerz posts its success/fail/cancel/ipn callbacks as form-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));
app.use("/api/v1", apiRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
