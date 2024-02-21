import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewClient } from "./clientsSlice";
import {
  TextField,
  Button,
  Grid,
  Box,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import ToastNotification from "../utilities/ToastNotification";

const AddClient = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const clientStatus = useSelector((state) => state.clients.status);
  const clientError = useSelector((state) => state.clients.error);
  const [toastOpen, setToastOpen] = useState(false);
  const [clientData, setClientData] = useState({
    fname: "",
    lname: "",
    email: "",
    phonenumber: "",
    userid: user.userid,
    birthday: "",
    age: 0,
    sex: "",
    description: "",
    initial_primary_symptoms: "",
    tongue: "",
    pulse: "",
  });

  const handleChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  // clear the input fields after insertion
  useEffect(() => {
    if (clientStatus === "succeeded") {
      setClientData({
        fname: "",
        lname: "",
        email: "",
        phonenumber: "",
        userid: user.userid,
        birthday: "",
        age: 0,
        sex: "",
        description: "",
        initial_primary_symptoms: "",
        tongue: "",
        pulse: "",
      });
    }
  }, [clientStatus, user.userid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewClient(clientData));
    setToastOpen(true);
  };
  const handleCloseToast = () => {
    setToastOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center" mt="25px">
          <Grid
            item
            xs={12}
            md={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Box width="100%" maxWidth={300}>
              <TextField
                name="fname"
                value={clientData.fname}
                onChange={handleChange}
                label="First Name"
                variant="outlined"
                fullWidth
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Box width="100%" maxWidth={300}>
              <TextField
                name="lname"
                value={clientData.lname}
                onChange={handleChange}
                label="Last Name"
                variant="outlined"
                fullWidth
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Box width="100%" maxWidth={300}>
              <TextField
                name="email"
                value={clientData.email}
                onChange={handleChange}
                label="Email"
                variant="outlined"
                fullWidth
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Box width="100%" maxWidth={300}>
              <TextField
                name="phonenumber"
                value={clientData.phonenumber}
                onChange={handleChange}
                label="Phone Number"
                variant="outlined"
                fullWidth
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Box width="100%" maxWidth={300}>
              <TextField
                name="birthday"
                value={clientData.birthday}
                onChange={handleChange}
                label="Birthday"
                variant="outlined"
                fullWidth
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Box width="100%" maxWidth={300}>
              <TextField
                name="age"
                value={clientData.age}
                onChange={handleChange}
                label="Age"
                variant="outlined"
                fullWidth
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Box width="100%" maxWidth={300} style={{ margin: 0, padding: 0 }}>
              <TextField
                select
                name="sex"
                value={clientData.sex}
                onChange={handleChange}
                label="Sex"
                variant="outlined"
                fullWidth
              >
                <MenuItem value="">
                  <em>Sex</em>
                </MenuItem>
                <MenuItem value="M">Male</MenuItem>
                <MenuItem value="F">Female</MenuItem>
                <MenuItem value="T">Transgender</MenuItem>
              </TextField>{" "}
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box width="100%" maxWidth={300}>
              <TextField
                name="description"
                value={clientData.description}
                onChange={handleChange}
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Box width="100%" maxWidth={300}>
              <TextField
                name="initial_primary_symptoms"
                value={clientData.initial_primary_symptoms}
                onChange={handleChange}
                label="Initial Primary Symptoms"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Box width="100%" maxWidth={300}>
              <TextField
                name="tongue"
                value={clientData.tongue}
                onChange={handleChange}
                label="Tongue"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Box width="100%" maxWidth={300}>
              <TextField
                name="pulse"
                value={clientData.pulse}
                onChange={handleChange}
                label="Pulse"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
              />
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ margin: "2vh" }}
            >
              Add Client
            </Button>
          </Grid>
        </Grid>
      </form>

      {clientStatus === "loading" && <CircularProgress />}

      <ToastNotification
        open={toastOpen && clientStatus === "succeeded"}
        handleClose={handleCloseToast}
        message={"Client added successfully!"}
        severity="success"
      />

      <ToastNotification
        open={toastOpen && clientStatus === "failed"}
        handleClose={handleCloseToast}
        message={clientError || "Failed to add client"}
        severity="error"
      />
    </>
  );
};

export default AddClient;
