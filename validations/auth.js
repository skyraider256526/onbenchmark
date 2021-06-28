const { body } = require("express-validator");
const models = require('../models'); 
const sequelize = models.Sequelize;
const op = sequelize.Op;

exports.authValidation = [
  body('username')
    .not()
    .isEmpty()
    .withMessage('username is required'),
  body('password')
    .not()
    .isEmpty()
    .withMessage('password required')
]
