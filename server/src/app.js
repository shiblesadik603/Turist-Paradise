const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");

const apiRoutes = require("./routes");
const { notFound, errorHandler } = require("./middleware/error.middleware");

const app = express();

// crossOriginResourcePolicy is relaxed because the frontend (a different origin/port)
// loads images directly from /uploads — Helmet's default would block that.
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(express.json());
// SSLCommerz posts its success/fail/cancel/ipn callbacks as form-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use("/api/v1", apiRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
