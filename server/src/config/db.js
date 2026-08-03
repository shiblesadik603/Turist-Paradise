const mongoose = require("mongoose");

const connectDB = async (mongoUri) => {
  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB");
};

module.exports = connectDB;
