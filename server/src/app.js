const express = require("express");
const cors = require("cors");
const path = require("path");

const apiRoutes = require("./routes");
const { notFound, errorHandler } = require("./middleware/error.middleware");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use("/api/v1", apiRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
