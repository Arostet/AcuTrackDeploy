import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "./authSlice";
import { Box, TextField, Button, Typography } from "@mui/material";
import ToastNotification from "../utilities/ToastNotification";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const [toastOpen, setToastOpen] = useState(false);

  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ email, password, fname, lname }));
    setToastOpen(true);
  };
  const handleCloseToast = () => {
    setToastOpen(false);
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Typography variant="h6">Register</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email Address"
          type="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="First Name"
          type="name"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Last Name"
          type="name"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={status === "loading"}
        >
          Register
        </Button>
        {status === "loading" && <Typography>Loading...</Typography>}
      </Box>

      <ToastNotification
        open={toastOpen && status === "succeeded"}
        handleClose={handleCloseToast}
        message={"User added successfully!"}
        severity="success"
      />

      <ToastNotification
        open={toastOpen && status === "failed"}
        handleClose={handleCloseToast}
        message={error || "Failed to add client"}
        severity="error"
      />
    </>
  );
};

export default RegistrationForm;
