const {
  getPointStatsDB,
  getDiagnosisStatsDB,
  getTreatmentCountsByDateDB,
  getPointStatsForUserDB,
  getDiagnosisStatsForUserDB,
} = require("../models/stats.model.js");

const getDiagnosisStatsForUser = async (req, res) => {
  try {
    const userid = req.params.userid;
    const stats = await getDiagnosisStatsForUserDB(userid);

    if (stats && stats.length > 0) {
      res.status(200).json(stats);
    } else {
      res.status(404).json({ message: "No data found for the specified user" });
    }
  } catch (err) {
    console.error("Error in getPointUsageStatsForUser:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTreatmentCountsByDate = async (req, res) => {
  try {
    const userid = req.params.userid;

    const treatmentCounts = await getTreatmentCountsByDateDB(userid);

    if (treatmentCounts && treatmentCounts.length > 0) {
      res.json(treatmentCounts);
    } else {
      res.status(404).json({ message: "No treatment data found" });
    }
  } catch (err) {
    console.error("Error in getTreatmentCountsByDate controller:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPointUsageStatsForUser = async (req, res) => {
  try {
    const userid = req.params.userid;
    const stats = await getPointStatsForUserDB(userid);

    if (stats && stats.length > 0) {
      res.status(200).json(stats);
    } else {
      res.status(404).json({ message: "No data found for the specified user" });
    }
  } catch (err) {
    console.error("Error in getPointUsageStatsForUser:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPointUsageStats = async (req, res) => {
  try {
    const clientid = req.params.clientid;
    console.log(clientid);
    const stats = await getPointStatsDB(clientid);

    if (stats && stats.length > 0) {
      res.status(200).json(stats);
    } else {
      res
        .status(404)
        .json({ message: "No data found for the specified client" });
    }
  } catch (err) {
    console.error("Error in getPointUsageStats:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getDiagnosisStats = async (req, res) => {
  try {
    const { clientid } = req.params;

    const stats = await getDiagnosisStatsDB(clientid);

    if (stats && stats.length > 0) {
      res.status(200).json(stats);
    } else {
      res
        .status(404)
        .json({ message: "No data found for the specified filters" });
    }
  } catch (err) {
    console.error("Error in getDiagnosisUsageStats:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getPointUsageStats,
  getDiagnosisStats,
  getTreatmentCountsByDate,
  getPointUsageStatsForUser,
  getDiagnosisStatsForUser,
};
