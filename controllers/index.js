const title = 'Local authentication sample';

exports.renderIndex = function(req, res) {
  res.render('index', { title: title, user: req.user });
}

exports.renderRegister = function(req, res) {
  if (req.user ){
    req.flash('error', 'Please log out to register');
    res.redirect('/');
  }
  res.render('register', { title: title });
}
