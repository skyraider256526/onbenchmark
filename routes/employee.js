var express = require('express');
var route = express.Router();

const { addEmployee, updateEmployee, deleteEmployee, getEmployeeById, getAllEmployee, getEmployeeListOfClient } = require('../controllers/employee/employeeAuthController');
const validationError = require('../middleware/validationError');
const { addEmployeeValidation } = require('../validations/employee');

// add employee
route.post('/add-emp',addEmployeeValidation, addEmployee);

// update employee
route.put('/update-emp/:id',addEmployeeValidation, updateEmployee);

// delete employee
route.delete('/delete-emp/:id', deleteEmployee);

// get employee
route.get('/get-emp',getAllEmployee);

// get employee by id
route.get('/get-emp/:id', getEmployeeById);

// get employee list selected by client
route.get('/get-clientlist',getEmployeeListOfClient);

module.exports = route;
