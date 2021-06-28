var express = require('express');
var route = express.Router();


const validationError = require('../middleware/validationError');
const checkAuth = require('../middleware/checkAuth');
const {wrapper} = require('../utlis/errorWrap');



// change role of user

// change password by admin

module.exports = route;
