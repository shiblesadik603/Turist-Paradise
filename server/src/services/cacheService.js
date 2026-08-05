/** Thin Redis cache-aside helpers — silently no-op if Redis isn't connected, so callers never need their own try/catch around it. */
const { redisClient, isRedisConnected } = require("../config/redis");

const get = async (key) => {
  if (!isRedisConnected()) return null;
  try {
    const raw = await redisClient.get(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const set = async (key, value, ttlSeconds) => {
  if (!isRedisConnected()) return;
  try {
    await redisClient.set(key, JSON.stringify(value), { EX: ttlSeconds });
  } catch {
    // Best-effort — a cache write failure shouldn't break the request.
  }
};

const del = async (key) => {
  if (!isRedisConnected()) return;
  try {
    await redisClient.del(key);
  } catch {
    // Best-effort.
  }
};

module.exports = { get, set, del };
