require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3001,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWTSECRET,
  expiresIn: process.env.EXPIREDIN, // Token expiration time
};
