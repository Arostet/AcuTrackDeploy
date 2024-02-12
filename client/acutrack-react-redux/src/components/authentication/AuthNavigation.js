import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import logo from "../../assets/images/logo.png";

const AuthNavigation = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  useEffect(() => {
    if (user) {
      navigate("/user-profile/:userid");
    }
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          direction: "column",
          justifyContent: "center",
          margin: "10vh",
        }}
      >
        <img src={logo} alt="Logo" style={{ maxHeight: 400 }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          direction: "column",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{ margin: "2vh", fontSize: "1rem", padding: "30px 50px" }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          onClick={handleRegister}
          sx={{ margin: "2vh", fontSize: "1rem", padding: "30px 50px" }}
        >
          Register
        </Button>
      </Box>
    </>
  );
};

export default AuthNavigation;
