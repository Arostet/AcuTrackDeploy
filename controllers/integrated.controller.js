const { allClientTreatmentsDB } = require("../models/integrated.model.js");

const allClientTreatments = (req, res) => {
  const clientid = req.params.clientid;

  if (!clientid) {
    return res.status(400).json({ msg: "User ID is required" });
  }

  allClientTreatmentsDB(clientid)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ msg: err.message });
    });
};

module.exports = {
  allClientTreatments,
};
