const express = require("express");
const clientsrouter = express.Router();

const {
  allClients,
  addClient,
  userClients,
  updateClient,
  deleteClient,
  getClient,
} = require("../controllers/clients.controller.js");

clientsrouter.get("/", allClients);
clientsrouter.get("/user/:userid", userClients);
clientsrouter.get("/client/:clientid", getClient); //important distinction in parameters v userClients
clientsrouter.post("/", addClient);
clientsrouter.put("/:clientid", updateClient);
clientsrouter.delete("/:clientid", deleteClient);

module.exports = {
  clientsrouter,
};
