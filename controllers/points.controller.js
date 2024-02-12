const { allPointsDB, getPointByIdDB } = require("../models/points.model.js");

const allPoints = (req, res) => {
  allPointsDB()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ msg: err.message });
    });
};

const getPointById = (req, res) => {
  const pointid = req.params.pointid;

  getPointByIdDB(pointid)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ msg: err.message });
    });
};

module.exports = {
  allPoints,
  getPointById,
};
