import { AppBar, Toolbar, Box } from "@mui/material";
import LogoNav from "./Logo/LogoNav";
import Navbar from "./Navbar/Navbar";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" alignItems="center" width="100%">
          <Box flexGrow={1}>
            <LogoNav />
          </Box>
          <Navbar />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
