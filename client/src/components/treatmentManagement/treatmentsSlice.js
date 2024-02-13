import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:3008";

//fetching treatments for a specific user
export const fetchUserTreatments = createAsyncThunk(
  "treatments/fetchUserTreatments",
  async (userid) => {
    const response = await axios.get(`${baseURL}/treatments/${userid}`);
    return response.data;
  }
);

//fetching single user treatment
export const fetchSingleTreatment = createAsyncThunk(
  "treatments/fetchSingleTreatment",
  async ({ userid, treatmentid }) => {
    const response = await axios.get(
      `${baseURL}/treatments/${userid}/${treatmentid}`
    );
    return response.data;
  }
);

//adding new treatment
export const addNewTreatment = createAsyncThunk(
  "treatments/addNewTreatment",
  async (treatmentData) => {
    const response = await axios.post(`${baseURL}/treatments`, treatmentData);
    return response.data;
  }
);

//deleting a treatment
export const deleteTreatment = createAsyncThunk(
  "treatments/deleteTreatment",
  async (treatmentid) => {
    const response = await axios.delete(`${baseURL}/treatments/${treatmentid}`);
    return response.data;
  }
);

//fetching point
export const fetchPoints = createAsyncThunk(
  "treatments/fetchPoints",
  async () => {
    const response = await axios.get(`${baseURL}/points`);
    return response.data;
  }
);

//fetching diagnosis
export const fetchDiagnosis = createAsyncThunk(
  "treatments/fetchDiagnosis",
  async () => {
    const response = await axios.get(`${baseURL}/diagnosis`);
    return response.data;
  }
);

const treatmentsSlice = createSlice({
  name: "treatments",
  initialState: {
    treatments: [],
    points: [],
    diagnosis: [],
    currentTreatmentId: null,
    currentClientName: "",
    setCurrentClientId: null,
    pointsLoading: false,
    diagnosisLoading: false,
    status: "idle",
    error: null,
  },
  reducers: {
    setCurrentTreatmentId: (state, action) => {
      state.currentTreatmentId = action.payload;
    },
    setCurrentClientName: (state, action) => {
      state.currentClientName = action.payload;
    },
    setCurrentClientId: (state, action) => {
      state.currentClientName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTreatments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserTreatments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.treatments = action.payload;
      })
      .addCase(fetchUserTreatments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSingleTreatment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleTreatment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.treatments = action.payload;
      })
      .addCase(fetchSingleTreatment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewTreatment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewTreatment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.treatments.push(action.payload);
      })
      .addCase(addNewTreatment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteTreatment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTreatment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.treatments = state.treatments.filter(
          (treatment) => treatment.treatmentid !== action.payload.treatmentid
        );
      })
      .addCase(deleteTreatment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPoints.pending, (state) => {
        state.pointsLoading = true;
      })
      .addCase(fetchPoints.fulfilled, (state, action) => {
        state.pointsLoading = false;
        state.points = action.payload;
      })
      .addCase(fetchPoints.rejected, (state, action) => {
        state.pointsLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDiagnosis.pending, (state) => {
        state.diagnosisLoading = true;
      })
      .addCase(fetchDiagnosis.fulfilled, (state, action) => {
        state.diagnosisLoading = false;
        state.diagnosis = action.payload;
      })
      .addCase(fetchDiagnosis.rejected, (state, action) => {
        state.diagnosisLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setCurrentTreatmentId,
  setCurrentClientName,
  setCurrentClientId,
} = treatmentsSlice.actions;

export default treatmentsSlice.reducer;
