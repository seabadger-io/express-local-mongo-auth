// routes/auth.js

var express = require('express');
var router = express.Router();
var local_controller = require('../controllers/auth-local.js');

/* Request login */
router.post('/login', local_controller.login);

/* Request registration */
router.post('/register', local_controller.register);

/* Request logout */
router.get('/logout', local_controller.logout);
router.post('/logout', local_controller.logout);

module.exports = router;

