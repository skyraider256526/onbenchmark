var express = require("express");
var route = express.Router();

const validationError = require("../middleware/validationError");
const { wrapper } = require("../utlis/errorWrap");
const { deployResourceValidation } = require("../validations/resourceManager");
const {
  resourceManagerDeployResource,
} = require("../controllers/resourceManager/resourceManagerController");
const {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getAllEmployee,
} = require("../controllers/employee/employeeAuthController");
const {
  addEmployeeValidation,
  updateEmployeeValidation,
} = require("../validations/employee");

// get client list
// route.get("/clients",  wrapper(getListOfClients));

// add employee
route.post(
  "/resource",
  addEmployeeValidation,
  validationError,
  wrapper(addEmployee)
);

// update resource
route.put(
  "/resource",
  updateEmployeeValidation,
  validationError,
  updateEmployee
);

// delete resource
route.delete("/resource/:id", deleteEmployee);

// get all employees
route.get("/all-resources", getAllEmployee);

// deploy resource
route.post(
  "/deploy",
  deployResourceValidation,
  validationError,
  resourceManagerDeployResource
);

// change password by admin

module.exports = route;
