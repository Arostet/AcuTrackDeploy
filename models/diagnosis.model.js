const { db } = require("../config/db.js");

const allDiagnosisDB = () => {
  try {
    return db("diagnosis").select("diagnosisid", "patternname").returning("*");
  } catch (err) {
    console.log(err);
  }
};

const getDiagnosisByIdDB = (diagnosisid) => {
  try {
    return db("diagnosis").where({ diagnosisid: diagnosisid }).returning("*");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  allDiagnosisDB,
  getDiagnosisByIdDB,
};
