const { db } = require("../config/db.js");

const getPointStatsDB = (clientid) => {
  try {
    return db("treatments")
      .select(
        "points.pointid",
        "points.name",
        "points.channel",
        "points.number"
      )
      .count("* as usage_frequency")
      .join(
        "treatments_points",
        "treatments.treatmentid",
        "=",
        "treatments_points.treatmentid"
      )
      .join("points", "treatments_points.pointid", "=", "points.pointid")
      .where("treatments.clientid", clientid)
      .groupBy(
        "points.pointid",
        "points.name",
        "points.channel",
        "points.number"
      )
      .orderBy("usage_frequency", "desc")
      .returning("*");
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getPointStatsForUserDB = async (userid) => {
  try {
    let query = db("treatments")
      .select(
        "points.pointid",
        "points.name",
        "points.channel",
        "points.number"
      )
      .count("* as usage_frequency")
      .join("clients", "treatments.clientid", "=", "clients.clientid")
      .join(
        "treatments_points",
        "treatments.treatmentid",
        "=",
        "treatments_points.treatmentid"
      )
      .join("points", "treatments_points.pointid", "=", "points.pointid")
      .where("clients.userid", userid)
      .groupBy(
        "points.pointid",
        "points.name",
        "points.channel",
        "points.number"
      )
      .orderBy("usage_frequency", "desc");

    return await query;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getDiagnosisStatsDB = (clientid) => {
  try {
    return db("treatments")
      .select("diagnosis.diagnosisid", "diagnosis.patternname")
      .count("* as usage_frequency")
      .join(
        "treatments_diagnosis",
        "treatments.treatmentid",
        "treatments_diagnosis.treatmentid"
      )
      .join(
        "diagnosis",
        "treatments_diagnosis.diagnosisid",
        "diagnosis.diagnosisid"
      )
      .where({ clientid: clientid })
      .groupBy("diagnosis.diagnosisid", "diagnosis.patternname")
      .orderBy("usage_frequency", "desc")
      .returning("*");
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getDiagnosisStatsForUserDB = async (userid) => {
  try {
    let query = db("treatments")
      .select("diagnosis.diagnosisid", "diagnosis.patternname")
      .count("* as diagnosis_frequency")
      .join("clients", "treatments.clientid", "=", "clients.clientid")
      .join(
        "treatments_diagnosis",
        "treatments.treatmentid",
        "=",
        "treatments_diagnosis.treatmentid"
      )
      .join(
        "diagnosis",
        "treatments_diagnosis.diagnosisid",
        "=",
        "diagnosis.diagnosisid"
      )
      .where("clients.userid", userid)
      .groupBy("diagnosis.diagnosisid", "diagnosis.patternname")
      .orderBy("diagnosis_frequency", "desc")
      .returning("*");

    return await query;
  } catch (err) {
    console.error("Error in getDiagnosisStatsForUserDB:", err);
    throw err;
  }
};

const getTreatmentCountsByDateDB = (userid) => {
  return db("treatments")
    .distinct(db.raw("DATE(treatments.tdate) as treatment_date"))
    .count("* as treatment_count")
    .join("clients", "treatments.clientid", "=", "clients.clientid")
    .where("clients.userid", userid)
    .groupBy("treatment_date");
};

module.exports = {
  getPointStatsDB,
  getDiagnosisStatsDB,
  getTreatmentCountsByDateDB,
  getPointStatsForUserDB,
  getDiagnosisStatsForUserDB,
};
