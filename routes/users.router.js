const express = require("express");
const usersrouter = express.Router();

const {
  allUsers,
  getUserById,
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
  logoutUser,
} = require("../controllers/users.controller.js");

usersrouter.get("/", allUsers);
usersrouter.get("/:userid", getUserById);
usersrouter.post("/login", loginUser);
usersrouter.post("/logout", logoutUser);
usersrouter.post("/register", registerUser);
usersrouter.put("/:userid", updateUser);
usersrouter.delete("/:userid", deleteUser);

module.exports = {
  usersrouter,
};
