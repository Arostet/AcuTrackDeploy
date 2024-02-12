const {
  allClientsDB,
  addClientDB,
  userClientsDB,
  updateClientDB,
  deleteClientDB,
  getClientDB,
} = require("../models/clients.model.js");

const { db } = require("../config/db.js");

const getClient = (req, res) => {
  const { clientid } = req.params;

  // Convert clientid to an integer (if it's supposed to be a number)
  const clientIdNum = parseInt(clientid, 10);
  if (isNaN(clientIdNum)) {
    // Respond with a 400 Bad Request if clientid is not a valid number
    return res.status(400).json({ msg: "Invalid client ID" });
  }

  console.log(`Fetching details for client ID: ${clientIdNum}`); // Debugging log
  getClientDB(clientIdNum)
    .then((data) => {
      // Check if data is not empty
      if (data) {
        res.status(200).json(data);
      } else {
        // If data is empty (no client found)
        res.status(404).json({ msg: "Client not found" });
      }
    })
    .catch((err) => {
      console.error(err); // Log the error for debugging
      if (err.message === "Client not found") {
        res.status(404).json({ msg: "Client not found" });
      } else {
        res.status(500).json({ msg: "Internal server error" });
      }
    });
};
const allClients = (req, res) => {
  allClientsDB()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ msg: err.message });
    });
};

const addClient = (req, res) => {
  const clientData = req.body;

  // Check if the user exists first
  db("users")
    .where({ userid: clientData.userid })
    .first()
    .then((user) => {
      if (!user) {
        // If the user doesn't exist, send an error response
        return res.status(400).json({ msg: "User does not exist" });
      }

      // If the user exists, proceed to add the client
      return addClientDB(clientData);
    })
    .then((data) => {
      // Data handling after successful insertion
      res.status(200).json({ msg: "Client added successfully", client: data });
    })
    .catch((err) => {
      // Error handling for any other errors
      res.status(400).json({ msg: err.message });
    });
};

//get all the clients of a specific user
const userClients = (req, res) => {
  const userid = req.params.userid; // Or req.user.id if need authentication

  userClientsDB(userid)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ msg: err.message });
    });
};

const updateClient = (req, res) => {
  const { clientid } = req.params; // Ensure you get the 'clientid' parameter specifically
  const { email, fname, lname, phonenumber, userid, img_path } = req.body;

  updateClientDB(clientid, email, fname, lname, phonenumber, userid, img_path)
    .then((data) => {
      if (data.status === 200) {
        res.status(200).json({ msg: data.message });
      } else {
        // It's better to send a more specific status code, but keeping the structure as is
        res.status(400).json({ msg: data.message });
      }
    })
    .catch((err) => {
      // Handle unexpected errors
      res.status(500).json({ error: err.message });
    });
};

const deleteClient = (req, res) => {
  const { clientid } = req.params;

  deleteClientDB(clientid)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ msg: err.message });
    });
};

module.exports = {
  allClients,
  addClient,
  userClients,
  updateClient,
  deleteClient,
  getClient,
};
