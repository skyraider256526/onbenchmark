var express = require("express");
var route = express.Router();
const validationError = require("../middleware/validationError");

const {
  addClient,
  getAllClient,
  getClient,
  deleteClient,
  updateClient,
} = require("../controllers/admin/adminController");
const {
  addClientValidation,
  deleteClientValidation,
  updateClientValidation,
} = require("../validations/admin");

// add client
route.post("/", addClientValidation, validationError, addClient);

// update client
route.put("/:id", updateClientValidation, validationError, updateClient);

// delete client
route.delete("/:id", deleteClientValidation, validationError, deleteClient);

// get clients
route.get("/", getAllClient);

// get client by id
route.get("/:id", getClient);

module.exports = route;
