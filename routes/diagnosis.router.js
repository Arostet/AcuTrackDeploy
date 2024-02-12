const express = require("express");
const diagnosisrouter = express.Router();

const {
  allDiagnosis,
  getDiagnosisById,
} = require("../controllers/diagnosis.controller.js");

diagnosisrouter.get("/", allDiagnosis);
diagnosisrouter.get("/:diagnosisid", getDiagnosisById);

module.exports = {
  diagnosisrouter,
};
