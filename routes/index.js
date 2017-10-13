// routes/index.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/index.js');

/* GET login / homepage page */
router.get('/', controller.renderIndex);

/* GET registration page */
router.get('/register', controller.renderRegister);

module.exports = router;
