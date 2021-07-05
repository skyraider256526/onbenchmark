var express = require("express");
var route = express.Router();

const validationError = require("../middleware/validationError");
const { wrapper } = require("../utlis/errorWrap");
const { deployResourceValidation } = require("../validations/resourceManager");
const {
  resourceManagerDeployResource,
  getRequestEmployeeList,
} = require("../controllers/resourceManager/resourceManagerController");
const {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getAllEmployee,
  getResume,
} = require("../controllers/employee/employeeAuthController");
const {
  addEmployeeValidation,
  updateEmployeeValidation,
} = require("../validations/employee");
const { getListOfClients } = require("../controllers/user/userAuthController");
const upload = require("../config/multer");

// get client list
// route.get("/clients",  wrapper(getListOfClients));

// add employee
route.post(
  "/resource",
  upload.single("resume"),
  addEmployeeValidation,
  validationError,
  wrapper(addEmployee)
);

// get resume
route.get("/resource/resume/:id", getResume);

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

// Get all requested employee list
route.get("/requestList", getRequestEmployeeList);

// Get all client
route.get("/clients", getListOfClients);

// change password by admin

module.exports = route;
