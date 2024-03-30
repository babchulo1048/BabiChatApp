const asyncMiddleware = require("../middleware/async");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config;
const config = require("../config/index");

exports.userRegister = asyncMiddleware(async (req, res) => {
  const { formData } = req.body;

  // const { email } = formData;
  const { email, password, confirmPassword } = formData;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ errors: { confirmPassword: "Passwords do not match" } });
  }

  // Check if a user with the same email already exists
  const existingUser = await User.findOne({ "formData.email": email });

  if (existingUser) {
    return res
      .status(400)
      .json({ errors: { email: "User with this email already exists" } });
  }
  const user = new User({ formData });
  await user.save();

  res.send(user);
});

exports.userDetail = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  res.send(user);
});

exports.userLogin = asyncMiddleware(async (req, res) => {
  // const {formData} = req.body
  const { password, email } = req.body;

  console.log({ password, email });

  // Check if the user exists with the provided email
  const user = await User.findOne({
    "formData.email": email,
    "formData.password": password,
  });

  if (!user)
    return res
      .status(400)
      .json({ errors: { message: "Invalid email or password" } });

  // Validate password
  // const isPasswordValid = await user.isValidPassword(password);

  // if (!isPasswordValid) {
  //   return res.status(400).json({ message: "Invalid email or password" });
  // }

  const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, {
    expiresIn: config.expiresIn,
  });

  res.status(200).send({ token, name: user.name, userId: user._id });
});
