import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:3008";

const initialState = {
  pointStats: [],
  diagnosisStats: [],
  treatmentCounts: [],
  status: "idle",
  error: null,
};

export const fetchTreatmentCounts = createAsyncThunk(
  "data/fetchTreatmentCounts",
  async (userId) => {
    const response = await axios.get(
      `${baseURL}/stats/treatmentCounts/${userId}`
    );
    return response.data;
  }
);

export const fetchPointStats = createAsyncThunk(
  "data/fetchPointStats",
  async (userId) => {
    const response = await axios.get(`${baseURL}/stats/points/user/${userId}`);
    return response.data;
  }
);

export const fetchDiagnosisStats = createAsyncThunk(
  "data/fetchDiagnosisStats",
  async (userId) => {
    const response = await axios.get(
      `${baseURL}/stats/diagnosis/user/${userId}`
    );
    return response.data;
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPointStats.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPointStats.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pointStats = action.payload;
      })
      .addCase(fetchPointStats.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchDiagnosisStats.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDiagnosisStats.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.diagnosisStats = action.payload;
      })
      .addCase(fetchDiagnosisStats.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchTreatmentCounts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTreatmentCounts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.treatmentCounts = action.payload;
      })
      .addCase(fetchTreatmentCounts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
