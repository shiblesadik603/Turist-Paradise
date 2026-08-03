const env = require("./config/env");
const connectDB = require("./config/db");
const app = require("./app");
const TouristSpotModel = require("./models/TouristSpot");

connectDB(env.mongoUri).catch((err) => console.error("Failed to connect to MongoDB", err));

TouristSpotModel.init()
  .then(() => console.log("Mongoose model synced with database"))
  .catch((err) => console.error("Error syncing model:", err));

app.listen(env.port, () => {
  console.log(`Server is running on port ${env.port}`);
});
