var express = require("express");
var router = express.Router();

// users routes
const user = require("./user");
router.use("/user", user);

// user-login
const auth = require("./auth");
router.use("/auth", auth);

// employees routes
const employee = require("./employee");
router.use("/employee", employee);

// client routes
const admin = require("./admin");
const checkAuth = require("../middleware/checkAuth");
// all actions are done by admin so checkAuth
router.use("/admin/client", checkAuth, admin);

module.exports = router;
