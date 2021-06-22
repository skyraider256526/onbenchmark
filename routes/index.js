var express = require('express');
var router = express.Router();

// users routes
const user = require('./user');
router.use("/user", user);

// user-login 
const auth = require('./auth');
router.use("/auth", auth)

// employees routes
const employee = require('./employee');
router.use('/employee', employee);

// client routes
const client = require('./client');
router.use('/client', client);

module.exports = router;
