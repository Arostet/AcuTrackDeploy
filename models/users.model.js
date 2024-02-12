const { db } = require("../config/db.js");

const allUsersDB = () => {
  try {
    return db("users")
      .select("userid", "email", "fname", "lname", "password")
      .returning("*");
  } catch (err) {
    console.log(err);
  }
};

const getUserByIdDB = (userid) => {
  try {
    return db("users")
      .select("userid", "email", "fname", "lname", "password")
      .where({ userid: userid })
      .returning("*");
  } catch (err) {
    console.log(err);
  }
};

const registerUserDB = (email, password, fname, lname) => {
  return db("users").insert({ email, password, fname, lname }, [
    "email",
    "password",
    "fname",
    "lname",
  ]);
};

const loginUserDB = (email) => {
  return db("users")
    .select("userid", "email", "fname", "lname", "password")
    .where({ email });
};

const updateUserDB = (userid, email, password, lname, fname) => {
  return db("users")
    .where({ userid: userid })
    .update({
      email,
      password,
      fname,
      lname,
    })
    .then(() => {
      return { status: "success", message: "Client updated successfuly" };
    })
    .catch(() => {
      return { status: "error updating user", message: error.message };
    });
};

const deleteUserDB = (userid) => {
  return db("users").where("userid", userid).delete();
};

module.exports = {
  allUsersDB,
  registerUserDB,
  loginUserDB,
  updateUserDB,
  deleteUserDB,
  getUserByIdDB,
};
