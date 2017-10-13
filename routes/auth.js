// routes/auth.js

const express = require('express');
const router = express.Router();
const localController = require('../controllers/auth-local.js');

/* Request login */
router.post('/login', localController.login);

/* Request registration */
router.post('/register', localController.register);

/* Request logout */
router.get('/logout', localController.logout);
router.post('/logout', localController.logout);

module.exports = router;

