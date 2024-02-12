const {
  allTreatmentsDB,
  insertNewTreatmentDB,
  allUserTreatmentsDB,
  singleUserTreatmentDB,
  deleteTreatmentDB,
} = require("../models/treatments.model.js");

const allTreatments = (req, res) => {
  allTreatmentsDB()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ msg: err.message });
    });
};

const singleUserTreatment = async (req, res) => {
  const { userId, treatmentId } = req.params;
  try {
    const treatment = await singleUserTreatmentDB(userId, treatmentId);
    res.json(treatment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const allUserTreatments = (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ msg: "User ID is required" });
  }

  allUserTreatmentsDB(userId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ msg: err.message });
    });
};

const insertNewTreatment = async (req, res) => {
  const treatmentData = req.body;
  try {
    const row = await insertNewTreatmentDB(treatmentData);
    res.json(row);
  } catch (error) {
    console.error("Error in controller:", error);
    res
      .status(500)
      .json({ success: false, error: "An error occurred in the request" });
  }
};

const deleteTreatment = async (req, res) => {
  const { treatmentId } = req.params;

  try {
    const result = await deleteTreatmentDB(treatmentId);

    if (result) {
      res
        .status(200)
        .json({ success: true, message: "Treatment deleted successfully" });
    } else {
      res.status(404).json({ success: false, error: "Treatment not found" });
    }
  } catch (error) {
    console.error("Error in controller:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred while deleting the treatment",
    });
  }
};

module.exports = {
  allTreatments,
  insertNewTreatment,
  allUserTreatments,
  singleUserTreatment,
  deleteTreatment,
};
