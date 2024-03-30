const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("mongodb connected"))
  .catch((ex) => console.log("Database connection error", ex.message));

module.exports = mongoose.connection;
