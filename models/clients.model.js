const { db } = require("../config/db.js");

const getClientDB = (clientid) => {
  return db("clients")
    .select(
      "clientid",
      "email",
      "fname",
      "lname",
      "phonenumber",
      "regdate",
      "userid",
      "img_path"
    )
    .where({ clientid })
    .then((data) => {
      if (data.length === 0) {
        throw new Error("Client not found");
      }
      return data[0]; // Assuming we want the first result
    })
    .catch((err) => {
      console.error(err); // Log and rethrow the error for the caller to handle
      throw err;
    });
};

const allClientsDB = () => {
  try {
    return db("clients")
      .select(
        "clientid",
        "email",
        "fname",
        "lname",
        "phonenumber",
        "regdate",
        "userid",
        "img_path"
      )
      .returning("*");
  } catch (err) {
    console.log(err);
  }
};

const addClientDB = (client) => {
  return db("clients")
    .insert({
      clientid: client.clientid,
      email: client.email,
      fname: client.fname,
      lname: client.lname,
      phonenumber: client.phonenumber,
      regdate: client.regdate,
      userid: client.userid,
      img_path: client.img_path,
    })
    .catch((err) => {
      console.log(err);
    });
};

const userClientsDB = (userid) => {
  return db("clients").where({ userid: userid });
};

const updateClientDB = (
  clientid,
  email,
  fname,
  lname,
  phonenumber,
  userid,
  img_path
) => {
  return db("clients")
    .where({ clientid: clientid })
    .update({
      email: email,
      fname: fname,
      lname: lname,
      phonenumber: phonenumber,
      userid: userid,
      img_path: img_path,
    })
    .then(() => {
      return { status: "success", message: "Client updated successfully" };
    })
    .catch((error) => {
      return { status: "error", message: error.message };
    });
};

const deleteClientDB = (clientid) => {
  return db("clients").where("clientid", clientid).delete();
};

module.exports = {
  allClientsDB,
  addClientDB,
  userClientsDB,
  updateClientDB,
  deleteClientDB,
  getClientDB,
};
