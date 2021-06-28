var express = require('express');
var router = express.Router();

// admin routes
const admin = require('./admin');
router.use("/admin", admin);

// user-login 
const auth = require('./auth');
router.use("/auth", auth)

// resource manager
const resourceManager = require('./resourceManager');
router.use('/resourceManager', resourceManager)

// employees routes
const employee = require('./employee');
router.use('/employee', employee);

// client routes
const client = require('./client');
router.use('/client', client);

module.exports = router;
