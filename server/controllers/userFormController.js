const asyncMiddleware = require("../middleware/async");
const UserForm = require("../models/UserForm");

exports.userFormCreate = asyncMiddleware(async (req, res) => {
  const { fields } = req.body;

  const form = new UserForm({ fields });

  await form.save();

  res.send("Form Created");
});

exports.UserFormDetail = asyncMiddleware(async (req, res) => {
  const form = await UserForm.find({});

  res.send(form);
});
