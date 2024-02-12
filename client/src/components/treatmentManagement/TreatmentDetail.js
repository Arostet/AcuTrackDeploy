import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../utilities/LoadingSpinner";
import { fetchSingleTreatment } from "./treatmentsSlice";
import { Box, Grid, Paper, Typography } from "@mui/material";

const TreatmentDetail = () => {
  const { treatmentId, userId } = useParams();
  console.log(useParams());
  const dispatch = useDispatch();

  const treatments = useSelector((state) => state.treatments.treatments);
  const treatmentStatus = useSelector((state) => state.clients.treatmentStatus);
  const clientName = useSelector((state) => state.treatments.currentClientName);
  console.log("Name IS", clientName);
  const processTreatments = (treatments) => {
    const groupedByDate = treatments.reduce((acc, treatment) => {
      const date = treatment.tdate.split("T")[0];

      if (!acc[date]) {
        acc[date] = {
          diagnoses: new Set(),
          pointChannels: new Set(),
          notes: treatment.notes, // Assuming notes are the same for each treatment on the same date
        };
      }

      acc[date].diagnoses.add(treatment.patternname);
      acc[date].pointChannels.add(`${treatment.channel}-${treatment.number}`);

      return acc;
    }, {});

    return Object.keys(groupedByDate).map((date) => ({
      date,
      diagnoses: Array.from(groupedByDate[date].diagnoses),
      pointChannels: Array.from(groupedByDate[date].pointChannels),
      notes: groupedByDate[date].notes,
    }));
  };

  const processedTreatments = processTreatments(treatments);
  console.log(processedTreatments);

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    if (userId && treatmentId) {
      dispatch(
        fetchSingleTreatment({
          userid: userId,
          treatmentid: treatmentId,
        })
      );
    }
  }, [dispatch, userId, treatmentId]);

  if (treatmentStatus === "loading") {
    // Loading state
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <LoadingSpinner />
      </Box>
    );
  }

  return (
    <>
      {processedTreatments && processedTreatments.length > 0 ? (
        processedTreatments.map((treatment, index) => (
          <Typography key={index} variant="h1" align="center" marginBottom={0}>
            {clientName}'s Treatment on {formatDate(treatment.date)}
          </Typography>
        ))
      ) : (
        <Typography variant="subtitle1">No treatments found</Typography>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        {processedTreatments ? (
          <Paper elevation={3} sx={{ p: 3, maxWidth: 600 }}>
            <Grid
              container
              spacing={2}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item></Grid>
              <Grid item></Grid>
              {processedTreatments.map((treatment, index) => (
                <Grid item key={index}>
                  <Typography variant="h5">
                    <b>Diagnosis</b>: {treatment.diagnoses.join(", ")}
                  </Typography>
                  <Typography variant="h5">
                    <b>Points</b>: {treatment.pointChannels.join(", ")}
                  </Typography>
                  <Typography variant="h5">
                    <b>Notes</b>: {treatment.notes}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Paper>
        ) : (
          <Typography variant="subtitle1">Client not found</Typography>
        )}
      </Box>
    </>
  );
};

export default TreatmentDetail;
