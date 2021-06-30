var express = require("express");
var router = express.Router();

// admin routes
const checkAuth = require("../middleware/checkAuth");
const admin = require("./admin");
router.use("/admin", checkAuth, admin);

// user-login
const auth = require("./auth");
router.use("/auth", auth);

// resource manager
const resourceManager = require("./resourceManager");
const checkResourceMngr = require("../middleware/checkResourceMngr");
router.use("/resourceManager", checkResourceMngr, resourceManager);

// employees routes
const employee = require("./employee");
router.use("/employee", employee);

// client routes
const client = require("./client");
router.use("/client", client);

// user routes
// const user = require("./user");
// router.use("/user", user);

module.exports = router;
