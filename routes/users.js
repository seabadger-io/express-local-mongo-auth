const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');
const session = require('../controllers/session');

/* request users listing */
router.get('/', session.isAuthenticated, controller.getUsers);

/* request logged in user, must come before :id */
router.get('/self', session.isAuthenticated, controller.getSelf);

/* request specified user */
router.get('/:id', session.isAuthenticated, controller.getUser);

module.exports = router;
