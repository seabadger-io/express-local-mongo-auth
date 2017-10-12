var express = require('express');
var router = express.Router();
var controller = require('../controllers/index.js');

/* GET login / homepage page */
router.get('/', controller.renderIndex);

/* GET registration page */
router.get('/register', controller.renderRegister);

module.exports = router;
