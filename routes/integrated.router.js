const express = require("express");
const integratedrouter = express.Router();

const {
  allClientTreatments,
} = require("../controllers/integrated.controller.js");

integratedrouter.get("/:clientid", allClientTreatments);

module.exports = {
  integratedrouter,
};
