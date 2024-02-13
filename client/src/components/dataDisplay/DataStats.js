import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPointStats,
  fetchDiagnosisStats,
  fetchTreatmentCounts,
} from "./dataSlice";
import DataTable from "./DataTable";
import TreatmentsGraph from "./TreatmentsGraph";

import { Grid, Typography } from "@mui/material";

const DataStats = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const pointStats = useSelector((state) => state.data.pointStats);
  const diagnosisStats = useSelector((state) => state.data.diagnosisStats);
  const treatmentCounts = useSelector((state) => state.data.treatmentCounts);

  useEffect(() => {
    dispatch(fetchPointStats(user.userid));
    dispatch(fetchDiagnosisStats(user.userid));
    dispatch(fetchTreatmentCounts(user.userid));
  }, [dispatch, user.userid]);

  const transformedPointsData = pointStats.map((point) => ({
    ...point,
    channelNumberName:
      `${point.channel} ${point.number}` +
      (point.name
        ? ` ${point.name.charAt(0).toUpperCase() + point.name.slice(1)}` //only display name if exists and capitalize first letter
        : ""),
  }));

  const pointColumns = [
    { field: "channelNumberName", headerName: "Point Detail" },
    { field: "usage_frequency", headerName: "Usage Frequency" },
  ];

  const diagnosisColumns = [
    { field: "patternname", headerName: "Diagnosis Pattern" },
    { field: "diagnosis_frequency", headerName: "Usage Frequency" },
  ];

  // const mostUsedPoint = pointStats.length > 0 ? pointStats[0].name : "No data";

  return (
    <Grid>
      <Typography variant="h1">Treatment Counts Over Time</Typography>
      <TreatmentsGraph treatmentsData={treatmentCounts} />
      <Typography variant="h1">Point Usage Stats</Typography>
      <DataTable data={transformedPointsData} columns={pointColumns} />
      <Typography variant="h1">Diagnosis Stats</Typography>
      <DataTable data={diagnosisStats} columns={diagnosisColumns} />
    </Grid>
  );
};

export default DataStats;
