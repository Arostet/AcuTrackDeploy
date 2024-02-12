import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteClient } from "./clientsSlice";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const DeleteClient = () => {
  const clientId = useSelector((state) => state.clients.currentClientId);
  console.log("Client ID in DeleteClient:", clientId);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    navigate("/clients");
  };

  const handleDelete = () => {
    if (clientId) {
      dispatch(deleteClient(clientId))
        .then(() => {
          navigate("/clients");
        })
        .catch((error) => {
          console.error("Failed to delete client:", error);
        });
    } else {
      console.error("Client ID is null");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle id="alert-dialog-title">
        {`This will permanently delete your client from the database. Would you like to proceed?`}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete} color="error" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteClient;
