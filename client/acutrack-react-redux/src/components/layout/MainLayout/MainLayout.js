import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const MainLayout = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      sx={{ backgroundColor: "#FFF8F0" }}
    >
      <Header />
      <Box component="main" flexGrow={1}>
        <Outlet /> {/* This is where nested routes will render */}
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
