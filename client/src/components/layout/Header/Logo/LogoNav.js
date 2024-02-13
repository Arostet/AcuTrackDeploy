import logoNav from "../../../../assets/images/logoNav.png";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const LogoNav = () => {
  return (
    <Box component={Link} to="/">
      <img
        src={logoNav}
        alt="Logo"
        style={{ maxHeight: 100, marginTop: "1vh" }}
      />
    </Box>
  );
};

export default LogoNav;
