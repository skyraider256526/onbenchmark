const { body, param } = require("express-validator");
const models = require("../models");
const sequelize = models.Sequelize;
const Op = sequelize.Op;

exports.addEmployeeValidation = [
  body("id").not().isEmpty().withMessage("Id is required"),
  body("firstName").not().isEmpty().withMessage("First name is required"),
  body("lastName").not().isEmpty().withMessage("Last name is required"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .custom(async value => {
      if (
        !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        )
      ) {
        return Promise.reject("Invalid email");
      }
    })
    .custom(async value => {
      return await models.user
        .findOne({
          where: {
            email: {
              [Op.iLike]: value,
            },
            isActive: true,
          },
        })
        .then(email => {
          if (email) {
            return Promise.reject("Email already exists !");
          }
        });
    }),
  body("mobileNumber")
    .not()
    .isEmpty()
    .withMessage("Mobile number is required")
    .custom(async value => {
      if (!/^[0-9]{10}$/i.test(value)) {
        return Promise.reject("Invalid mobile number");
      }
    })
    .custom(async value => {
      return await models.user
        .findOne({
          where: {
            mobileNumber: value,
            isActive: true,
          },
        })
        .then(mobileNumber => {
          if (mobileNumber) {
            return Promise.reject("Mobile number already exists !");
          }
        });
    }),
  body("technology").not().isEmpty().withMessage("Technology is required"),
  body("yearOfExperience")
    .not()
    .isEmpty()
    .withMessage("yearOfExperience is required"),
  body("currentLocation")
    .not()
    .isEmpty()
    .withMessage("currentLocation is required"),
];
exports.updateEmployeeValidation = [
  body("id").not().isEmpty().withMessage("Id is required"),
  body("firstName").not().isEmpty().withMessage("First name is required"),
  body("lastName").not().isEmpty().withMessage("Last name is required"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .custom(async value => {
      if (
        !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        )
      ) {
        return Promise.reject("Invalid email");
      }
    })
    .custom(async value => {
      return await models.user
        .findOne({
          where: {
            email: {
              [Op.iLike]: value,
            },
            isActive: true,
          },
        })
        .then(email => {
          if (email) {
            return Promise.reject("Email already exists !");
          }
        });
    }),
  body("mobileNumber")
    .not()
    .isEmpty()
    .withMessage("Mobile number is required")
    .custom(async value => {
      if (!/^[0-9]{10}$/i.test(value)) {
        return Promise.reject("Invalid mobile number");
      }
    })
    .custom(async value => {
      return await models.user
        .findOne({
          where: {
            mobileNumber: value,
            isActive: true,
          },
        })
        .then(mobileNumber => {
          if (mobileNumber) {
            return Promise.reject("Mobile number already exists !");
          }
        });
    }),
  body("technology").not().isEmpty().withMessage("Technology is required"),
  body("yearOfExperience")
    .not()
    .isEmpty()
    .withMessage("yearOfExperience is required"),
  body("currentLocation")
    .not()
    .isEmpty()
    .withMessage("currentLocation is required"),
];

exports.deleteEmployeeValidation = [
  body("id").not().isEmpty().withMessage("id is required"),
];
exports.getEmployeeByIdValidation = [
  param("id").not().isEmpty().withMessage("id is required"),
];
