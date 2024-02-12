const express = require("express");
const treatmentsrouter = express.Router();

const {
  allTreatments,
  insertNewTreatment,
  allUserTreatments,
  singleUserTreatment,
  deleteTreatment,
} = require("../controllers/treatments.controller.js");

treatmentsrouter.get("/", allTreatments);
treatmentsrouter.get("/:userId", allUserTreatments);
treatmentsrouter.get("/:userId/:treatmentId", singleUserTreatment);
treatmentsrouter.post("/", insertNewTreatment);
treatmentsrouter.delete("/:treatmentId", deleteTreatment);

module.exports = {
  treatmentsrouter,
};
