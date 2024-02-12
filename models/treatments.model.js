const { db } = require("../config/db.js");

const allTreatmentsDB = async () => {
  try {
    const result = await db
      .select(
        "users.userid ",
        "clients.fname ",
        "clients.lname ",
        "points.channel",
        "points.number",
        "diagnosis.patternname ",
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
      .returning("*");

    return result;
  } catch (err) {
    console.error(err);
    throw err; // Rethrow the error for handling at a higher level if needed
  }
};

const allUserTreatmentsDB = async (userId) => {
  try {
    const result = await db
      .select(
        "treatments.treatmentid",
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
      .where("users.userid", userId)
      .returning("*");

    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const singleUserTreatmentDB = async (userId, treatmentId) => {
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
      .where("users.userid", userId)
      .andWhere("treatments.treatmentid", treatmentId)
      .returning("*");

    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const insertNewTreatmentDB = async (treatmentData) => {
  const treatmentid = Math.floor(Date.now() / 1000); // Generating treatmentid

  try {
    await db.transaction(async (trx) => {
      const { clientid, tdate, notes, pointid, diagnosisid } = treatmentData;

      // Insert into treatments table
      await trx("treatments").insert({
        treatmentid,
        clientid,
        tdate,
        notes,
      });

      // Insert into treatments_points table for each pointId
      if (Array.isArray(pointid) && pointid.length) {
        const pointsData = pointid.map((pid) => ({
          treatmentid,
          pointid: pid,
        }));
        await trx("treatments_points").insert(pointsData);
      }

      // Insert into treatments_diagnosis table for each diagnosisId
      if (Array.isArray(diagnosisid) && diagnosisid.length) {
        const diagnosisData = diagnosisid.map((did) => ({
          treatmentid,
          diagnosisid: did,
        }));
        await trx("treatments_diagnosis").insert(diagnosisData);
      }

      // Commit the transaction
      await trx.commit();

      return {
        success: true,
        message: "Treatment inserted successfully.",
        treatmentId: treatmentid,
      };
    });
  } catch (error) {
    console.error("Error in transaction:", error);
    return { success: false, error: error.message, treatmentId: treatmentid };
  }
};

const deleteTreatmentDB = async (treatmentId) => {
  try {
    await db.transaction(async (trx) => {
      // Delete from treatments_points table
      await trx("treatments_points").where("treatmentid", treatmentId).del();

      // Delete from treatments_diagnosis table
      await trx("treatments_diagnosis").where("treatmentid", treatmentId).del();

      // Delete from treatments table
      const deletedTreatment = await trx("treatments")
        .where("treatmentid", treatmentId)
        .del();

      if (deletedTreatment) {
        await trx.commit();
        return true; // Treatment deleted successfully
      } else {
        return false; // Treatment not found
      }
    });
  } catch (error) {
    console.error("Error deleting treatment:", error);
    throw error;
  }
};

module.exports = {
  allTreatmentsDB,
  insertNewTreatmentDB,
  allUserTreatmentsDB,
  singleUserTreatmentDB,
  deleteTreatmentDB,
};
