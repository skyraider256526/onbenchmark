var express = require('express');
var route = express.Router();


const { getUserById, changeRole, changePasswordByAdmin, getAllUsers, addAdmin, updateAdmin, deleteAdmin, getAllAdmin } = require("../controllers/admin/adminAuthController");
const { addUserValidation, UpdateUserValidation, userValidation } = require('../validations/user');
const { addResourceManager, updateResourceManager, deleteResourceManager, getAllResourceManagers, getResourceManagerById } = require('../controllers/resourceManager/resourceManagerAuth');
const validationError = require('../middleware/validationError');
const checkAuth = require('../middleware/checkAuth');
const {wrapper} = require('../utlis/errorWrap');
const { addEmployee, updateEmployee, deleteEmployee, getAllEmployee, getEmployeeListOfClient } = require('../controllers/employee/employeeAuthController');
const { addUser, updateUser, getAllUser, deleteUser, getClientList, getListOfClients, getListOfResourceManager } = require('../controllers/user/userAuthController');

// add admins
route.post('/',checkAuth, addUserValidation, validationError, wrapper(addUser));
// route.post('/', addUserValidation, validationError, addUser);

// update admin user
route.put('/',checkAuth, UpdateUserValidation, validationError, wrapper(updateUser));

// delete admin user
route.delete('/user/:id',checkAuth, wrapper(deleteUser));

// get admin users
route.get('/all', wrapper(getAllUser));

// get admin user by id
route.get('/user/:id',checkAuth, wrapper(getUserById));

// change role by admin
route.post('/role', checkAuth, wrapper(changeRole));

// change password by admin
route.post('/change-password',checkAuth, wrapper(changePasswordByAdmin));

// get client list 
route.get('/clients',checkAuth, wrapper(getListOfClients));

// get resource manager list
route.get('/resource-managers',checkAuth, wrapper(getListOfResourceManager));

// add employee
route.post('/resource',checkAuth, wrapper(addEmployee))

// update resource
route.put('/resource', updateEmployee);

// delete resource
route.delete('/resource/:id', deleteEmployee);

// get all employees
route.get('/all-resources', getAllEmployee);



// add resource manager
// route.post('/resource-manager',checkAuth, addResourceManager);

// update resource manager
// route.put('/resource-manager',checkAuth, updateResourceManager);

// delete resource manager
// route.delete('/resource-manager',checkAuth, deleteResourceManager);

// get resource manager
// route.get('/resource-manager/all',checkAuth, getAllResourceManagers);

// get resource manager by id
// route.get('/resource-manager/:id', checkAuth, getResourceManagerById);



// add resource
// route.post('/resource',checkAuth, addEmployee);

// edit resource
// route.put('/resource',checkAuth, updateEmployee);

// delete resource
// route.delete('/resource',checkAuth, deleteEmployee);

// get all resource
// route.get('/resource/all',checkAuth, getAllEmployee);

// get resource list selected by client
// route.get('/resource/client',checkAuth, getEmployeeListOfClient);

// get resource manager by id

module.exports = route;
