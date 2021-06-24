const { body, param } = require("express-validator");
const models = require("../models");
const sequelize = models.Sequelize;
const Op = sequelize.Op;

exports.addClientValidation = [
  body("fullName").not().isEmpty().withMessage("Full name is required"),
  body("password").not().isEmpty().withMessage("password is required"),
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
      // I am checking in client model, since it is seperated from user
      return await models.client
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
      return await models.client
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
  body("companyName").not().isEmpty().withMessage("companyName is required"),
];

exports.deleteClientValidation = [
  param("id")
    .not()
    .isEmpty()
    .withMessage("Id is required")
    .custom(async id => {
      if ((await models.client.findOne({ where: { id } })) === null)
        return Promise.reject("Client doesn't exist");
    }),
];

exports.updateClientValidation = [
  body("isActive").not().exists().withMessage("isActive field is not valid"),
  body("modifiedBy")
    .not()
    .exists()
    .withMessage("modifiedBy field is not valid"),
  body("createdBy").not().exists().withMessage("createdBy field is not valid"),
  body("id").not().exists().withMessage("id field is not valid"),
  param("id")
    .not()
    .isEmpty()
    .withMessage("Id is required")
    .custom(async id => {
      return await models.client.findOne({ where: { id } }).catch(err => {
        console.log(err);
        return Promise.reject("Client doesn't exist");
      });
    }),
  // Assuming number to be 10 digits
  body("mobileNumber").isNumeric().isLength({ min: 10, max: 10 }).optional(),
];
