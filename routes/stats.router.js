const express = require("express");
const statsrouter = express.Router();

const {
  getPointUsageStats,
  getDiagnosisStats,
  getTreatmentCountsByDate,
  getPointUsageStatsForUser,
  getDiagnosisStatsForUser,
} = require("../controllers/stats.controller.js");

statsrouter.get("/diagnosis/user/:userid", getDiagnosisStatsForUser);
statsrouter.get("/points/user/:userid", getPointUsageStatsForUser);
statsrouter.get("/points/client/:clientid", getPointUsageStats);
statsrouter.get("/diagnosis/client/:clientid", getDiagnosisStats);
statsrouter.get("/treatmentCounts/:userid", getTreatmentCountsByDate);

module.exports = { statsrouter };
