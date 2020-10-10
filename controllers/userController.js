const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/User');

exports.readAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.createNewUser = (req, res) => {
  res.status(500).json({ status: 'error', message: "Can't handle this route" });
};

exports.readSigleUser = (req, res) => {
  res.status(500).json({ status: 'error', message: "Can't handle this route" });
};

exports.updateSingleUser = (req, res) => {
  res.status(500).json({ status: 'error', message: "Can't handle this route" });
};

exports.deleteSingleUser = (req, res) => {
  res.status(500).json({ status: 'error', message: "Can't handle this route" });
};
