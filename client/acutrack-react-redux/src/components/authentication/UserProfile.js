import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "./authSlice";
import { Box, Typography, Paper, Grid } from "@mui/material"; // Import Paper and Grid

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user && user.userid) {
      dispatch(fetchUserData(user.userid));
      console.log("USER----!", user);
    }
  }, [dispatch, user]);

  return (
    <Box
      sx={{
        margin: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h1">Your Profile</Typography>
      {user && (
        <Paper elevation={3} sx={{ p: 3, maxWidth: "100%" }}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{ mb: 2 }}
          >
            <Grid item xs={12} sm={8}>
              <Typography variant="h6">
                <b>Email:</b> {user.email}
              </Typography>
              <Typography variant="h6">
                <b>First Name:</b> {user.fname}
              </Typography>
              <Typography variant="h6">
                <b>Last Name:</b> {user.lname}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default UserProfile;
