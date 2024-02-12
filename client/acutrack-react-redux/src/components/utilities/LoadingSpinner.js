import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;
