const { body } = require("express-validator");
const models = require('../models');
const sequelize = models.Sequelize;
const Op = sequelize.Op;

exports.addUserValidation = [
  body('firstName')
    .not()
    .isEmpty()
    .withMessage('User name is required'),
  body('email')
    .not()
    .isEmpty()
    .withMessage('Email is required')
    .custom(async value => {
      if (! /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
        return Promise.reject("Invalid email");
      }
    })
    .custom(async value => {
      return await models.user.findOne({
        where: {
          email: {
            [Op.iLike]: value
          },
          isActive: true
        }
      }).then(email => {
        if (email) {
          return Promise.reject("Email already exists !");
        }
      })
    }),
  body('mobileNumber')
    .not()
    .isEmpty()
    .withMessage('Mobile number is required')
    .custom(async value => {
      if (!/^[0-9]{10}$/i.test(value)) {
        return Promise.reject("Invalid mobile number");
      }
    })
    .custom(async value => {
      return await models.user.findOne({
        where: {
          mobileNumber: value,
          isActive: true
        }
      }).then(mobileNumber => {
        if (mobileNumber) {
          return Promise.reject("Mobile number already exists !");
        }
      })
    }),
  body('password')
    .not()
    .isEmpty()
    .withMessage('Password is required'),
  body('roleId')
    .not()
    .isEmpty()
    .withMessage('roleId is required'),
  body('roleName')
    .not()
    .isEmpty()
    .withMessage('roleName is required')
];

exports.UpdateUserValidation = [
  body('firstName')
    .not()
    .isEmpty()
    .withMessage('User name is required'),
  body('email')
    .not()
    .isEmpty()
    .withMessage('Email is required')
    .custom(async value => {
      if (! /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
        return Promise.reject("Invalid email");
      }
    })
    .custom(async (value, { req }) => {
      return await models.user.findOne({
        where: {
          id: { [Op.not]: req.params.id },
          email: {
            [Op.iLike]: value
          },
          isActive: true
        }
      }).then(email => {
        if (email) {
          return Promise.reject("Email already exists !");
        }
      })
    }),
  body('mobileNumber')
    .not()
    .isEmpty()
    .withMessage('Mobile number is required ')
    .custom(async value => {
      if (!/^[0-9]{10}$/i.test(value)) {
        return Promise.reject("Invalid mobile number");
      }
    })
    .custom(async (value, { req }) => {
      return await models.user.findOne({
        where: {
          mobileNumber: {
            [Op.iLike]: value
          },
          id: { [Op.not]: req.params.id },
          isActive: true
        }
      }).then(mobile => {
        if (mobile) {
          return Promise.reject("Mobile number already exists !");
        }
      })
    }),
];


exports.userValidation = [
  body('firstName')
    .not()
    .isEmpty()
    .withMessage('first name is required'),

  body('lastName')
    .not()
    .isEmpty()
    .withMessage('last name is required'),

  body('password')
    .not()
    .isEmpty()
    .withMessage('password is required'),

  body('mobileNumber')
    .not()
    .isEmpty()
    .withMessage('mobile number is required')
    .custom(async value => {

      if (!/^[0-9]{10}$/i.test(value)) {
        return Promise.reject("Invalid mobile number");
      }

    })
]

exports.adminUpdateValidation = [
  body('userName')
    .not()
    .isEmpty()
    .withMessage('user name is required'),
  body('mobileNumber')
    .not()
    .isEmpty()
    .withMessage('mobile number is required')
    .custom(async value => {
      if (!/^[0-9]{10}$/i.test(value)) {
        return Promise.reject("Invalid mobile number");
      }
    })
    .custom(async (value, { req }) => {
      return await models.user.findOne({
        where: {
          mobileNumber: {
            [Op.iLike]: value
          },
          id: { [Op.not]: req.userData.id },
          isActive: true
        }
      }).then(mobile => {
        if (mobile) {
          return Promise.reject("mobile number already exist !");
        }
      })
    }),
  body('email')
    .not()
    .isEmpty()
    .withMessage('email is required')
    .custom(async value => {
      if (! /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
        return Promise.reject("Invalid email");
      }
    })
    .custom(async (value, { req }) => {
      return await models.user.findOne({
        where: {
          id: { [Op.not]: req.userData.id },
          email: {
            [Op.iLike]: value
          },
          isActive: true
        }
      }).then(email => {
        if (email) {
          return Promise.reject("email already exist!");
        }
      })
    })
]


