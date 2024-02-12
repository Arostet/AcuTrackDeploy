import { AppBar, Toolbar, Box } from "@mui/material";
import Logo from "./Logo/Logo";
import Navbar from "./Navbar/Navbar";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" alignItems="center" width="100%">
          <Box flexGrow={1}>
            <Logo />
          </Box>
          <Navbar />
        </Box>
      </Toolbar>
    </AppBar>
    // <AppBar position="static">
    //   <Toolbar>
    //     <Box
    //       display="flex"
    //       justifyContent="flex-start"
    //       alignItems="center"
    //       width="100%"
    //     >
    //       <Logo alignSelf="flex-end" />
    //       <Navbar />
    //     </Box>
    //   </Toolbar>
    // </AppBar>
  );
};

export default Header;
