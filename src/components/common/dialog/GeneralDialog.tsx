import React from "react";
import { useDialog } from "./Helper";
import {
  AppBar,
  Box,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import { modalStyle } from "./Style";
import { useDialogContext } from "../../../utils/helpers/context/dialog-context/DialogContext";
import CloseIcon from "@mui/icons-material/close";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GeneralDialog: React.FC = () => {
  const styles = modalStyle;
  const {
    dialog: {
      open,
      form: { title, body },
    },
  } = useDialogContext();
  const { handleDialogClose } = useDialog();

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleDialogClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      TransitionComponent={Transition}
      transitionDuration={600}
    >
      <AppBar position="relative" variant="elevation" elevation={0}>
        <Toolbar
          variant="dense"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="h5">{title}</Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleDialogClose}
            aria-label="close"
            sx={{ float: "right" }}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={styles.dialog}>
        <Box>{body}</Box>
      </Box>
    </Dialog>
  );
};

export default GeneralDialog;
