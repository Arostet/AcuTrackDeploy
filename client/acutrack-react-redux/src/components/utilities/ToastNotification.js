import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ToastNotification = ({ open, handleClose, message, severity }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <MuiAlert
        onClose={handleClose}
        severity={severity}
        elevation={6}
        variant="filled"
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default ToastNotification;
