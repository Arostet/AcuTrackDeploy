import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import {
  fetchUserTreatments,
  setCurrentTreatmentId,
  setCurrentClientName,
} from "./treatmentsSlice";

////
const TreatmentList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const selectUserTreatments = (state) => state.treatments.treatments;
  const treatments = useSelector(selectUserTreatments);
  const uniqueTreatments = treatments
    .filter(
      (treatment, index, self) =>
        index === self.findIndex((t) => t.treatmentid === treatment.treatmentid)
    )
    .sort((a, b) => new Date(b.tdate) - new Date(a.tdate)); // Sorting treatments by date

  const navigate = useNavigate();
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (user.userid) {
      dispatch(fetchUserTreatments(user.userid));
    }
  }, [dispatch, user.userid]);

  useEffect(() => {
    console.log(treatments);
  }, [treatments]);

  const handleDelete = (treatmentId) => {
    dispatch(setCurrentTreatmentId(treatmentId));
    navigate(`/treatments/delete/${treatmentId}`);
  };

  const handleView = (event, treatment) => {
    event.stopPropagation(); //Prevent event bubbling -- let the url change
    dispatch(setCurrentTreatmentId(treatment.treatmentid));
    dispatch(setCurrentClientName(treatment.fname));
    navigate(`/treatments/${user.userid}/${treatment.treatmentid}`);
  };

  return (
    <div>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h1" component="h1">
          Treatments
        </Typography>
        <Button
          component={RouterLink}
          to="/treatments/add"
          variant="contained"
          color="primary"
        >
          Add Treatment
        </Button>
      </Box>
      <List>
        {uniqueTreatments.map((treatment, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={
                <Typography variant="body1" component="span" fontWeight="bold">
                  {`${treatment.fname} ${treatment.lname} on ${formatDate(
                    treatment.tdate
                  )} `}
                </Typography>
              }
            />
            <Button onClick={(e) => handleView(e, treatment)} color="primary">
              View
            </Button>
            {/* <Button
              component={RouterLink}
              to={`/treatments/edit/${treatment.treatmentid}`}
              color="primary"
            >
              Edit
            </Button> */}
            <Button
              onClick={() => handleDelete(treatment.treatmentid)}
              style={{
                //this style consistent with DeleteClient
                backgroundColor: "red",
                color: "white",
                padding: "10px",
              }}
              variant="contained"
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TreatmentList;
