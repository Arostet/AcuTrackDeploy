const { db } = require("../config/db.js");

const allPointsDB = () => {
  try {
    return db("points")
      .select("pointid", "channel", "number", "name")
      .returning("*");
  } catch (err) {
    console.log(err);
  }
};

const getPointByIdDB = (pointid) => {
  try {
    return db("points").where({ pointid: pointid }).returning("*");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  allPointsDB,
  getPointByIdDB,
};
