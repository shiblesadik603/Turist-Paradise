/** BullMQ queue: AI trip generation runs as a background job instead of blocking the request. */
const { Queue } = require("bullmq");
const IORedis = require("ioredis");
const env = require("../config/env");

// maxRetriesPerRequest: null is required by BullMQ for blocking commands.
const connection = new IORedis(env.redisUrl, { maxRetriesPerRequest: null });

const tripPlanQueue = new Queue("trip-plan-generation", { connection });

module.exports = { tripPlanQueue, connection };
