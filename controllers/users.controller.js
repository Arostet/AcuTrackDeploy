const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const {
  allUsersDB,
  registerUserDB,
  loginUserDB,
  updateUserDB,
  deleteUserDB,
  getUserByIdDB,
} = require("../models/users.model.js");

const allUsers = (req, res) => {
  allUsersDB()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ msg: err.message });
    });
};
const getUserById = (req, res) => {
  const userid = req.params.userid;

  getUserByIdDB(userid)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ msg: err.message });
    });
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const row = await loginUserDB(email.toLowerCase());

    if (row.length === 0)
      return res.status(401).json({ msg: "Email does not exist" });

    const match = bcrypt.compareSync(password + "", row[0].password);
    if (!match) return res.status(401).json({ msg: "Incorrect Password" });

    const user = {
      userid: row[0].userid,
      email: row[0].email,
      fname: row[0].fname,
      lname: row[0].lname,
    };

    const userid = row[0].userid;
    const useremail = row[0].email;
    const secret = process.env.ACCESS_TOKEN_SECRET;

    const accesstoken = jwt.sign({ userid, useremail }, secret, {
      expiresIn: "1d",
    });

    res.cookie("token", accesstoken, {
      maxAge: 86400000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // send only over HTTPS
      sameSite: "strict", // CSRF protection
    });

    res.json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong." });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ msg: "Logged out successfully" });
};

const registerUser = async (req, res) => {
  const { email, password, fname, lname } = req.body;
  const lowerEmail = email.toLowerCase();

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password + "", salt);
  // put validation that email is unique and not null and that password is not null
  try {
    const row = await registerUserDB(lowerEmail, hash, fname, lname);
    res.json(row);
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "email exists" });
  }
};

const updateUser = (req, res) => {
  const { userid } = req.params;
  const { email, password, fname, lname } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password + "", salt);

  updateUserDB(userid, email, hash, fname, lname)
    .then((data) => {
      if (data.status === 200) {
        res.status(200).json({ msg: data.message });
      } else {
        res.status(400).json({ msg: data.message });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

const deleteUser = (req, res) => {
  const { userid } = req.params;

  deleteUserDB(userid)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ msg: err.message });
    });
};

module.exports = {
  allUsers,
  getUserById,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  deleteUser,
};
