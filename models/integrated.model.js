const { db } = require("../config/db.js");

const allClientTreatmentsDB = async (clientid) => {
  try {
    const result = await db
      .select(
        "clients.fname",
        "clients.lname",
        "points.channel",
        "points.number",
        "diagnosis.patternname",
        "treatments.tdate",
        "treatments.notes"
      )
      .from("treatments")
      .innerJoin("clients", "treatments.clientid", "clients.clientid")
      .innerJoin("users", "clients.userid", "users.userid")
      .innerJoin(
        "treatments_diagnosis",
        "treatments.treatmentid",
        "treatments_diagnosis.treatmentid"
      )
      .innerJoin(
        "treatments_points",
        "treatments.treatmentid",
        "treatments_points.treatmentid"
      )
      .innerJoin("points", "treatments_points.pointid", "points.pointid")
      .innerJoin(
        "diagnosis",
        "treatments_diagnosis.diagnosisid",
        "diagnosis.diagnosisid"
      )
      .where("clients.clientid", clientid)
      .returning("*");

    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  allClientTreatmentsDB,
};
