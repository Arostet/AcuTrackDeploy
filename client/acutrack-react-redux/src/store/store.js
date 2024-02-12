import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "../components/clientManagement/clientsSlice";
import treatmentsReducer from "../components/treatmentManagement/treatmentsSlice";
import dataReducer from "../components/dataDisplay/dataSlice";
import authReducer from "../components/authentication/authSlice";
const store = configureStore({
  reducer: {
    clients: clientReducer,
    treatments: treatmentsReducer,
    data: dataReducer,
    auth: authReducer,
  },
});

export default store;
