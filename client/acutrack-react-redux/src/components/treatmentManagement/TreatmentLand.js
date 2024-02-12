import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TreatmentLand = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`/treatments`);
    }
  }, [user, navigate]);

  if (!user) {
    return <Typography variant="h1">Log in or Register</Typography>;
  }

  return <div>Loading...</div>;
};

export default TreatmentLand;
