import { Box, Typography, Container } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: "primary.main", color: "primary.contrastText", py: 2 }}
    >
      <Container maxWidth="lg">
        <Typography variant="h6" align="center">
          AcuTrack: The Acupuncture Treatment Tracker
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
