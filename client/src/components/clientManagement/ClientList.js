import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserClients } from "./clientsSlice";
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setCurrentClientId } from "./clientsSlice";

const ClientList = () => {
  const user = useSelector((state) => state.auth.user);
  const selectUserClients = (state) => state.clients.clients;

  const clients = useSelector(selectUserClients);

  const dispatch = useDispatch();

  const sortedClients = [...clients].sort((a, b) =>
    a.lname.localeCompare(b.lname)
  );

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserClients(user.userid));
  }, [dispatch, user.userid]);

  const handleDelete = (clientid) => {
    dispatch(setCurrentClientId(clientid));
    navigate(`/clients/delete/${clientid}`);
  };

  return (
    <div>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h1" component="h1">
          Clients
        </Typography>
        <Button
          component={RouterLink}
          to="/clients/add"
          variant="contained"
          color="primary"
        >
          Add Client
        </Button>
      </Box>
      <List>
        {sortedClients.map((client) => (
          <ListItem key={client.clientid}>
            <ListItemText
              primary={
                <Typography variant="body1" component="span" fontWeight="bold">
                  {client.lname}, {client.fname}
                </Typography>
              }
            />
            <Button
              component={RouterLink}
              to={`/clients/${client.clientid}`}
              color="primary"
            >
              View
            </Button>
            <Button
              component={RouterLink}
              to={`/clients/edit/${client.clientid}`}
              color="secondary"
            >
              Edit
            </Button>
            <Button
              onClick={() => handleDelete(client.clientid)}
              style={{
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

export default ClientList;
