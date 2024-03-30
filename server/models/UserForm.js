const mongoose = require("mongoose");

const userFormSchema = new mongoose.Schema({
  fields: [
    {
      name: { type: String },
      type: { type: String },
      label: { type: String },
      keyboard_type: { type: String },
      userValue: { type: String },
    },
  ],
});

const UserForm = mongoose.model("userForm", userFormSchema);

module.exports = UserForm;
