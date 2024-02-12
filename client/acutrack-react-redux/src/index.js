import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#ff7961",
      main: "#ff0000", // main primary color - red
      dark: "#ba000d", // darker shade of primary color
      contrastText: "#fff", // text color that contrasts with the primary color
    },
    secondary: {
      light: "#ff4081",
      main: "#f50057",
      dark: "#c51162",
      contrastText: "#000",
    },
  },
  typography: {
    fontFamily: ["Roboto", '"Helvetica Neue"', "Arial", "sans-serif"].join(","),
    h1: {
      fontFamily: "Montserrat, sans-serif",
      fontSize: "3.0rem",
      fontWeight: 600,
      color: "#333",
      textAlign: "center",
      padding: "10px",
      marginTop: "7vh",
      marginBottom: "4vh",
      position: "relative", // Needed for absolute positioning of the pseudo-element
      "&::after": {
        // Pseudo-element for the underline
        content: '""', // Required for pseudo-elements
        display: "block",
        width: "50%",
        height: "4px",
        backgroundColor: "red",
        position: "absolute",
        left: "25%", // Adjust this to center the underline
        bottom: "0", // Position at the bottom of the h1
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
  // Add custom mixins, transitions, zIndex, etc.
});

export default theme;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
