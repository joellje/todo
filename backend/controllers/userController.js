const User = require("../models/userModel");

exports.getAllUsers = async (req, res, next) => {
  try {
    const result = await User.find();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
