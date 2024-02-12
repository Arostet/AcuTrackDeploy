import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTreatment } from "./treatmentsSlice";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const DeleteTreatment = () => {
  const treatmentId = useSelector(
    (state) => state.treatments.currentTreatmentId
  );
  console.log("Treatment ID in DeleteTreatment:", treatmentId);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    navigate("/treatments");
  };

  const handleDelete = () => {
    if (treatmentId) {
      dispatch(deleteTreatment(treatmentId))
        .then(() => {
          navigate("/treatments");
          // Optionally, show a success toast notification here
        })
        .catch((error) => {
          console.error("Failed to delete treatment:", error);
        });
    } else {
      console.error("Treatment ID is null");
      // Handle the case where treatmentId is null
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle id="alert-dialog-title">
        {`This action will permanently delete your treatment. Would you like to proceed?`}
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

export default DeleteTreatment;
