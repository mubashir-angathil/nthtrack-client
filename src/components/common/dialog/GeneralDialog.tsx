// GeneralDialog: React component for displaying a general dialog.

import React, { useEffect } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { modalStyle } from "./Style";
import { useDialog } from "./Helper";
import { useDialogContext } from "../../../utils/helpers/context/dialog-context/DialogContext";

const GeneralDialog: React.FC = () => {
  const styles = modalStyle;
  const {
    dialog: {
      open,
      form: { title, body },
    },
  } = useDialogContext();
  const { handleDialogClose } = useDialog();

  // Close dialog when user presses browser navigation
  useEffect(() => {
    const handlePopstate = () => {
      handleDialogClose();
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [handleDialogClose]);

  return (
    <Dialog
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      transitionDuration={300}
      PaperProps={{
        component: Paper,
        elevation: 3,
      }}
    >
      <DialogTitle
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height={50}
      >
        {title}
        <IconButton onClick={handleDialogClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={styles.dialog}>
        <Box>{body}</Box>
      </DialogContent>
    </Dialog>
  );
};

export default GeneralDialog;
