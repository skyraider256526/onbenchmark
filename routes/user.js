const { Router } = require("express");
var express = require("express");
var route = express.Router();

const {
  addUser,
  updateUser,
  deleteUser,
  getUserById,
  changeRole,
  changePasswordByAdmin,
} = require("../controllers/user/userAuthController");
const {
  addUserValidation,
  UpdateUserValidation,
  userValidation,
} = require("../validations/user");
const validationError = require("../middleware/validationError");
const checkAuth = require("../middleware/checkAuth");

// add user
route.post(
  "/admin-user",
  checkAuth,
  addUserValidation,
  validationError,
  addUser
);

// helper to add admin account use only in development
// route.post("/admin-user", addUserValidation, validationError, addUser);

// update user
route.put(
  "/admin-user/:id",
  checkAuth,
  UpdateUserValidation,
  validationError,
  updateUser
);

// delete user
route.delete("/admin-user/:id", checkAuth, deleteUser);

// get users

// get user by id
route.get("/admin-user/:id", getUserById);

// change role of user
route.post("/admin-role/:id", checkAuth, changeRole);

// change password by admin
route.post("/change-passwd/:id", checkAuth, changePasswordByAdmin);

module.exports = route;
