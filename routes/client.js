var express = require("express");
var route = express.Router();

const { addEmpList } = require("../controllers/client/clientAuthController");

// add employee
route.post("/add-emp", addEmpList);

// update employee

// delete employee

// get employee

// get employee by id

module.exports = route;
