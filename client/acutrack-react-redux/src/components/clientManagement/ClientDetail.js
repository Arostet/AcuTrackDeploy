import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../utilities/LoadingSpinner";
import { fetchClientDetails, fetchClientTreatments } from "./clientsSlice";
import { Box, Grid, Paper, Typography, Divider } from "@mui/material";

const ClientDetail = () => {
  const { clientId } = useParams();
  const dispatch = useDispatch();

  const client = useSelector((state) =>
    state.clients.clients.find((c) => c.clientid.toString() === clientId)
  );
  const treatments = useSelector((state) => state.clients.treatments);
  const clientStatus = useSelector((state) => state.clients.status);
  const treatmentStatus = useSelector((state) => state.clients.treatmentStatus);
  const clientError = useSelector((state) => state.clients.error);

  const processTreatments = (treatments) => {
    const groupedByDate = treatments.reduce((acc, treatment) => {
      const date = treatment.tdate.split("T")[0];

      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(treatment);
      return acc;
    }, {});

    const result = Object.keys(groupedByDate).map((date) => {
      const uniqueDiagnoses = new Set();
      const uniquePointChannels = new Set();
      const notes = new Set();

      groupedByDate[date].forEach((treatment) => {
        uniqueDiagnoses.add(treatment.patternname);
        uniquePointChannels.add(`${treatment.channel}-${treatment.number}`);
        notes.add(treatment.notes);
      });

      return {
        date,
        diagnoses: Array.from(uniqueDiagnoses),
        pointChannels: Array.from(uniquePointChannels),
        notes,
      };
    });

    return result;
  };

  const processedTreatments = processTreatments(treatments);
  console.log(processedTreatments);

  useEffect(() => {
    if (client === undefined) {
      dispatch(fetchClientDetails(clientId));
    }
    dispatch(fetchClientTreatments(clientId));
  }, [dispatch, clientId, client]);

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString();
  };

  if (clientStatus === "loading" || treatmentStatus === "loading") {
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

  if (clientStatus === "failed") {
    return <div>Error: {clientError}</div>;
  }

  return (
    <>
      <Typography variant="h1" align="center" marginBottom={0}>
        {client.fname} {client.lname}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        {client ? (
          <Paper elevation={3} sx={{ p: 3, maxWidth: "100%" }}>
            {processedTreatments.map((treatment, index) => (
              <React.Fragment key={index}>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                  sx={{ mb: 2 }}
                >
                  {/* Left column for treatment number and date */}
                  <Grid item xs={12} sm={4}>
                    <Typography
                      variant="h6"
                      fontWeight={1000}
                      textAlign="center"
                    >
                      Treatment {index + 1} - {formatDate(treatment.date)}
                    </Typography>
                  </Grid>

                  {/* Right column for treatment details */}
                  <Grid item xs={12} sm={8}>
                    <Typography variant="h6">
                      <b>Diagnosis:</b> {treatment.diagnoses.join(", ")}
                    </Typography>
                    <Typography variant="h6">
                      <b>Points:</b> {treatment.pointChannels.join(", ")}
                    </Typography>
                    <Typography variant="h6">
                      <b>Notes:</b> {treatment.notes}
                    </Typography>
                  </Grid>
                </Grid>
                {index < processedTreatments.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Paper>
        ) : (
          <Typography variant="subtitle1">Client not found</Typography>
        )}
      </Box>
    </>
  );
};

export default ClientDetail;
