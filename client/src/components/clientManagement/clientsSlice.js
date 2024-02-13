import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:3008";

// fetching clients of a specific user
export const fetchUserClients = createAsyncThunk(
  "clients/fetchUserClients",
  async (userid) => {
    const response = await axios.get(`${baseURL}/clients/user/${userid}`);
    return response.data;
  }
);

export const fetchClientTreatments = createAsyncThunk(
  "clients/fetchClientTreatments",
  async (clientid) => {
    const response = await axios.get(`${baseURL}/integrated/${clientid}`);
    return response.data;
  }
);

// fetching specific client
export const fetchClientDetails = createAsyncThunk(
  "clients/fetchClientDetails",
  async (clientid) => {
    const response = await axios.get(`${baseURL}/clients/client/${clientid}`);
    return response.data;
  }
);

// adding a new client
export const addNewClient = createAsyncThunk(
  "clients/addNewClient",
  async (clientData) => {
    const response = await axios.post(`${baseURL}/clients`, clientData);
    return response.data;
  }
);

// updating a client
export const updateClient = createAsyncThunk(
  "clients/updateClient",
  async ({ clientid, clientData }) => {
    const response = await axios.put(
      `${baseURL}/clients/${clientid}`,
      clientData
    );
    return response.data;
  }
);

// deleting a client
export const deleteClient = createAsyncThunk(
  "clients/deleteClient",
  async (clientid) => {
    const response = await axios.delete(`${baseURL}/clients/${clientid}`);
    return response.data;
  }
);

const clientsSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [],
    treatments: [],
    currentClientId: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setCurrentClientId: (state, action) => {
      state.currentClientId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserClients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserClients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clients = action.payload;
      })
      .addCase(fetchUserClients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchClientTreatments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClientTreatments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.treatments = action.payload;
      })
      .addCase(fetchClientTreatments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(addNewClient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewClient.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clients.push(action.payload);
      })
      .addCase(addNewClient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateClient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.clients.findIndex(
          (client) => client.clientid === action.payload.clientid
        );
        if (index !== -1) {
          state.clients[index] = action.payload;
        }
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteClient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clients = state.clients.filter(
          (client) => client.clientid !== action.payload.clientid
        );
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchClientDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClientDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.clients.findIndex(
          (client) => client.clientid === action.payload.clientid
        );
        if (index !== -1) {
          state.clients[index] = action.payload;
        } else {
          state.clients.push(action.payload);
        }
      })
      .addCase(fetchClientDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentClientId } = clientsSlice.actions;

export default clientsSlice.reducer;
