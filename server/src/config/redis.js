/** Redis connection — optional infra. Caching and the job queue skip themselves gracefully if this never connects. */
const { createClient } = require("redis");
const env = require("./env");

const redisClient = createClient({ url: env.redisUrl });
let connected = false;

redisClient.on("error", (err) => {
  if (connected) {
    console.warn("Redis error:", err.message);
    connected = false;
  }
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    connected = true;
    console.log("Connected to Redis");
  } catch (err) {
    console.warn(
      `Redis unavailable (${err.message}) — caching and background jobs will run without it.`
    );
  }
};

module.exports = { redisClient, connectRedis, isRedisConnected: () => connected };
