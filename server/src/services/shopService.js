const PowerProduct = require("../models/PowerProduct");
const SleepProduct = require("../models/SleepProduct");
const BagProduct = require("../models/BagProduct");
const RainProduct = require("../models/RainProduct");
const SecurityProduct = require("../models/SecurityProduct");

const modelsByCategory = {
  power: PowerProduct,
  sleep: SleepProduct,
  bags: BagProduct,
  rain: RainProduct,
  security: SecurityProduct,
};

const getProductsByCategory = (category) => modelsByCategory[category].find();

module.exports = { modelsByCategory, getProductsByCategory };
