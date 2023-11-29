import React from "react";
import { useDialog } from "./Helper";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import { modalStyle } from "./Style";
import { useDialogContext } from "../../../utils/helpers/context/dialog-context/DialogContext";
import CloseIcon from "@mui/icons-material/Close";
// import { TransitionProps } from "@mui/material/transitions";

// const Transition = React.forwardRef(function Transition(
//   props: TransitionProps & {
//     children: React.ReactElement;
//   },
//   ref: React.Ref<unknown>,
// ) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

const GeneralDialog: React.FC = () => {
  const styles = modalStyle;
  const {
    dialog: {
      open,
      form: { title, body },
    },
  } = useDialogContext();
  const { handleDialogClose } = useDialog();

  window.addEventListener("popstate", () => {
    // close dialog when use press browser navigation
    handleDialogClose();
  });

  React.useEffect(() => {
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
