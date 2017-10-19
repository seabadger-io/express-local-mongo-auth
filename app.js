// app.js
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const passport = require('passport');
const User = require('./models/user');
// configs
const config = require('./config/appcfg');
// routers
const index = require('./routes/index');
const auth = require('./routes/auth');
const users = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// connect to MongoDB, exit on error without retry
mongoose.connect(config.db.uri, {
  useMongoClient: true
}).then(
  () => {
    console.log('Connected to MongoDB (' + mongoose.connection.name + ')');
  },
  (err) => {
    console.log('MongoDB connection failed: ' + err);
    process.exit(1);
  }
);

// setup session handler
app.use(require('express-session')({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: { maxAge: 3600000 }
}));
app.use(passport.initialize());
app.use(passport.session());

// support flash messages
app.use(flash());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// setup routes
app.use('/', index);
app.use('/auth', auth);
app.use('/users', users);

// configure passport
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
