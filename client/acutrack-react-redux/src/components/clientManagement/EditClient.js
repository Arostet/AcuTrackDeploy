import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../utilities/LoadingSpinner";
import { fetchClientDetails, updateClient } from "./clientsSlice";
import ToastNotification from "../utilities/ToastNotification";
import { Container, TextField, Button, Typography, Grid } from "@mui/material";

const EditClient = () => {
  const { clientId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const client = useSelector((state) =>
    state.clients.clients.find((c) => c.clientid.toString() === clientId)
  );
  const clientStatus = useSelector((state) => state.clients.status);
  const clientError = useSelector((state) => state.clients.error);

  const [clientData, setClientData] = useState({
    fname: "",
    lname: "",
    email: "",
    phonenumber: "",
  });

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success", // can be 'error', 'warning', 'info', or 'success'
  });

  useEffect(() => {
    if (client) {
      setClientData(client);
    } else {
      dispatch(fetchClientDetails(clientId));
    }
  }, [dispatch, clientId, client]);

  const handleChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateClient({ clientid: clientId, clientData }))
      .then(() => {
        setToast({
          open: true,
          message: "Client updated successfully",
          severity: "success",
        });
        navigate("/clients");
      })
      .catch((error) => {
        console.error("Failed to update client:", error);
        setToast({
          open: true,
          message: `Error updating client: ${error.message}`,
          severity: "error",
        });
      });
  };

  if (clientStatus === "loading") {
    return <LoadingSpinner />;
  }

  if (clientStatus === "failed") {
    return <div>Error: {clientError}</div>;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h1" gutterBottom>
        Edit {clientData.fname}'s Information
      </Typography>

      {clientStatus === "loading" ? (
        <LoadingSpinner />
      ) : clientStatus === "failed" ? (
        <div>Error: {clientError}</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} marginTop={2} marginBottom={6}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="fname"
                value={clientData.fname}
                onChange={handleChange}
                label="First Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="lname"
                value={clientData.lname}
                onChange={handleChange}
                label="Last Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="email"
                value={clientData.email}
                onChange={handleChange}
                label="Email"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="phonenumber"
                value={clientData.phonenumber}
                onChange={handleChange}
                label="Phone Number"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Button type="submit" variant="contained" color="primary">
                Update Client
              </Button>
            </Grid>
          </Grid>
        </form>
      )}

      <ToastNotification
        open={toast.open}
        handleClose={handleCloseToast}
        message={toast.message}
        severity={toast.severity}
      />
    </Container>
  );
};

export default EditClient;
