const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  //   phone: { type: String },
  //   code: { type: String },
  formData: { type: mongoose.Schema.Types.Mixed },
});

const user = mongoose.model("user", userSchema);
module.exports = user;
