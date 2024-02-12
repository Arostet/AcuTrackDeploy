const express = require("express");
const cors = require("cors");

const app = express();
const dotenv = require("dotenv");

const { clientsrouter } = require("./routes/clients.router.js");
const { diagnosisrouter } = require("./routes/diagnosis.router.js");
const { treatmentsrouter } = require("./routes/treatments.router.js");
const { usersrouter } = require("./routes/users.router.js");
const { pointsrouter } = require("./routes/points.router.js");
const { integratedrouter } = require("./routes/integrated.router.js");
const { statsrouter } = require("./routes/stats.router.js");
dotenv.config({
  path: "/Users/Micha/Documents/Programming/AcuTrack/shared/.env",
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/clients", clientsrouter);
app.use("/diagnosis", diagnosisrouter);
app.use("/treatments", treatmentsrouter);
app.use("/users", usersrouter);
app.use("/points", pointsrouter);
app.use("/integrated", integratedrouter);
app.use("/stats", statsrouter);

app.listen(3008, () => {
  console.log("AcuTrack listening on 8");
});

app.use(express.static(path.join(__dirname, "/client/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
