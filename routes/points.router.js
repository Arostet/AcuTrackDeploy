const express = require("express");
const pointsrouter = express.Router();

const {
  allPoints,
  getPointById,
} = require("../controllers/points.controller.js");

pointsrouter.get("/", allPoints);
pointsrouter.get("/:pointid", getPointById);

module.exports = {
  pointsrouter,
};
