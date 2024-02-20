import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

import clientReducer from "../components/clientManagement/clientsSlice";
import treatmentsReducer from "../components/treatmentManagement/treatmentsSlice";
import dataReducer from "../components/dataDisplay/dataSlice";
import authReducer from "../components/authentication/authSlice";

// Encryption configuration
const encryptor = encryptTransform({
  secretKey: process.env.REACT_APP_SECRET_KEY || "5543444556666664444491",
  onError: function (error) {
    console.log(error);
  },
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  transforms: [encryptor],
  whitelist: ["clients", "treatments", "data", "auth"], // Add reducers that you want to persist here
};

const rootReducer = combineReducers({
  clients: clientReducer,
  treatments: treatmentsReducer,
  data: dataReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
