import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserClients } from "../clientManagement/clientsSlice";
import {
  setCurrentClientId,
  addNewTreatment,
  fetchDiagnosis,
  fetchPoints,
} from "../treatmentManagement/treatmentsSlice";
import ToastNotification from "../utilities/ToastNotification";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {
  Box,
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextareaAutosize,
  CircularProgress,
  Typography,
} from "@mui/material";

const AddTreatment = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients.clients);
  const user = useSelector((state) => state.auth.user);
  const points = useSelector((state) => state.treatments.points);
  const diagnosis = useSelector((state) => state.treatments.diagnosis);
  const treatmentStatus = useSelector((state) => state.treatments.status);
  const treatmentError = useSelector((state) => state.treatments.error);

  const [selectedPoints, setSelectedPoints] = useState([]);
  const [selectedDiagnoses, setSelectedDiagnosis] = useState([]);

  const [treatmentData, setTreatmentData] = useState({
    clientid: null,
    tdate: "",
    notes: "",
    pointid: [],
    diagnosisid: [],
  });

  const [toastOpen, setToastOpen] = useState(false);
  const handleCloseToast = () => {
    setToastOpen(false);
  };

  useEffect(() => {
    dispatch(fetchUserClients(user.userid));
    dispatch(fetchDiagnosis());
    dispatch(fetchPoints());
  }, [dispatch, user.userid]);

  //make sure that the current treatmentid is updated
  useEffect(() => {
    setTreatmentData({ ...treatmentData, pointid: selectedPoints });
  }, [selectedPoints, treatmentData]);

  useEffect(() => {
    setTreatmentData({ ...treatmentData, diagnosisid: selectedDiagnoses });
  }, [selectedDiagnoses, treatmentData]);

  // clear the input fields after insertion
  useEffect(() => {
    if (treatmentStatus === "succeeded") {
      setTreatmentData({
        clientid: null,
        tdate: "",
        notes: "",
        pointid: [],
        diagnosisid: [], // Adjust according to your needs
      });
    }
  }, [treatmentStatus]);

  const handleChange = (e) => {
    setTreatmentData({ ...treatmentData, [e.target.name]: e.target.value });
  };

  const handleClientChange = (e) => {
    const selectedClientId = parseInt(e.target.value, 10);
    if (!isNaN(selectedClientId)) {
      setTreatmentData({ ...treatmentData, clientid: selectedClientId });
      dispatch(setCurrentClientId(selectedClientId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addNewTreatment(treatmentData));
    setToastOpen(true);

    console.log(treatmentData);
  };

  return (
    <>
      <Typography variant="h1" component="h1">
        Add Treatment
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            margin: "5%",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="client-label">Client</InputLabel>
                <Select
                  labelId="client-label"
                  name="clientid"
                  value={treatmentData.clientid}
                  onChange={handleClientChange}
                  label="Client"
                >
                  <MenuItem value="">
                    <em>Select a Client</em>
                  </MenuItem>
                  {clients.map((client) => (
                    <MenuItem key={client.clientid} value={client.clientid}>
                      {client.fname} {client.lname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="tdate"
                type="date"
                value={treatmentData.tdate}
                onChange={handleChange}
                label=""
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextareaAutosize
                minRows={3}
                name="notes"
                value={treatmentData.notes}
                onChange={handleChange}
                placeholder="Notes"
                style={{ width: "100%" }}
              />
            </Grid>
          </Grid>
          <Autocomplete
            multiple
            options={points}
            getOptionLabel={(option) => `${option.channel} ${option.number}`} //displaying channel and number
            onChange={(event, value) =>
              setSelectedPoints(value.map((point) => point.pointid))
            } // Storing selected point ids
            renderInput={(params) => (
              <TextField
                {...params}
                label="Points"
                placeholder="Select Points"
              />
            )}
          />
          <Autocomplete
            multiple
            options={diagnosis}
            getOptionLabel={(option) => option.patternname}
            onChange={(event, value) =>
              setSelectedDiagnosis(
                value.map((diagnosis) => diagnosis.diagnosisid)
              )
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Diagnosis"
                placeholder="Select Diagnosis"
              />
            )}
          />
          <Button type="submit" variant="contained" color="primary">
            Add Treatment
          </Button>
        </Box>
      </form>
      {treatmentStatus === "loading" && <CircularProgress />}

      <ToastNotification
        open={toastOpen && treatmentStatus === "succeeded"}
        handleClose={handleCloseToast}
        message={"Treatment added successfully!"}
        severity="success"
      />

      <ToastNotification
        open={toastOpen && treatmentStatus === "failed"}
        handleClose={handleCloseToast}
        message={treatmentError || "Failed to add client"}
        severity="error"
      />
    </>
  );
};

export default AddTreatment;
