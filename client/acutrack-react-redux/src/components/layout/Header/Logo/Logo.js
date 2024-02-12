import logo from "../../../../assets/images/logo.png";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Box component={Link} to="/">
      <img src={logo} alt="Logo" style={{ maxHeight: 100, marginTop: "1vh" }} />
    </Box>
  );
};

export default Logo;
