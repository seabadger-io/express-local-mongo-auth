// controllers/user.js

const User = require('../models/user');

// controller functions
exports.getUser = function (req, res, next) {
  const id = req.params['id'];
  return getUserById(req, res, next, id);
};

exports.getUsers = function (req, res, next) {
  User.find({}, function (err, users) {
    if (err) return next(err);
    return res.json(users);
  });
};

exports.getSelf = function (req, res, next) {
  const id = req.user._id;
  return getUserById(req, res, next, id);
};

// common functions
const getUserById = function (req, res, next, id) {
  User.findById(id, function (err, user) {
    if (err) return next(err);
    if (user) {
      return res.json(user);
    } else {
      res.status = 404;
      res.json({ message: 'User not found' });
    }
  });
};
