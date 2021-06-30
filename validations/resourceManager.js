const { body } = require("express-validator");

exports.deployResourceValidation = [
  body("empIds")
    .isArray({ min: 1 })
    .withMessage("list of employee id are required"),
  body("clientId").notEmpty(),
];
