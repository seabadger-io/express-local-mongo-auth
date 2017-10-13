// controllers/auth-local.js
const User = require('../models/user');
const passport = require('passport');

exports.login = function (req, res, next) {
  passport.authenticate('local', function (err, user) {
    if (err) {
      err.status = 400;
      return next(err);
    }
    if (!user) {
      req.flash('error', 'Login failed');
      return res.redirect('/');
    }
    // establish session
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash('info', 'Login successful');
      res.redirect('/');
    });
  })(req, res, next);
};

exports.register = function (req, res, next) {
  const user = {
    email: req.body.email
  };
  if (req.body.password.length < 1) {
    req.flash('error', 'Password required');
    return res.redirect('/register');
  }
  User.register(new User(user), req.body.password, (err) => {
      if (err) {
        req.flash('error', err.message);
        return res.redirect('/register');
      }
      passport.authenticate('local')(req, res, () => {
        req.flash('info', 'Registration successful');
        return res.redirect('/');
      });
  });
};

exports.logout = function (req, res) {
  req.logout();
  req.flash('info', 'Successful logout');
  res.redirect('/');
};

