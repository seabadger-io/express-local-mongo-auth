// controllers/session.js

exports.isAuthenticated = function (req, res, next) {
  if (req.user) {
    return next();
  } else {
    req.flash('error', 'You are not logged in');
    return res.redirect('/');
  }
};
