import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { logoutUser } from "../../../authentication/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <Box display="flex" flexDirection={"row"}>
      <Button color="inherit" component={Link} to="/user-auth">
        User
      </Button>
      <Button color="inherit" component={Link} to="/treatmentland">
        Treatments
      </Button>
      <Button color="inherit" component={Link} to="/clientland">
        Clients
      </Button>
      <Button color="inherit" component={Link} to="/data">
        Data
      </Button>
      <Button color="inherit" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Navbar;
