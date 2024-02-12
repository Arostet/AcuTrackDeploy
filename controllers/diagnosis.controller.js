const {
  allDiagnosisDB,
  getDiagnosisByIdDB,
} = require("../models/diagnosis.model.js");

const allDiagnosis = (req, res) => {
  allDiagnosisDB()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ msg: err.message });
    });
};

const getDiagnosisById = (req, res) => {
  const diagnosisid = req.params.diagnosisid;

  getDiagnosisByIdDB(diagnosisid)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ msg: err.message });
    });
};

module.exports = {
  allDiagnosis,
  getDiagnosisById,
};
