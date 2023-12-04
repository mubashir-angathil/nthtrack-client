import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { FC } from "react";
import { useAlert } from "./Helper";

const AlertComponent: FC = () => {
  const {
    alert: {
      open,
      alert: { message, negativeButton, positiveButton, response, title },
    },
    handleCloseAlert,
  } = useAlert();

  return (
    <Dialog
      open={open}
      onClose={handleCloseAlert}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleCloseAlert();
            response("reject");
          }}
          size="small"
          variant="outlined"
          color="error"
        >
          {negativeButton}
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => response("accept")}
          autoFocus
        >
          {positiveButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertComponent;
