import React from "react";
import { useModal } from "./Helper";
import {
  Box,
  Modal,
  Divider,
  IconButton,
  Paper,
  DialogContent,
  Fade,
} from "@mui/material";
import { modalStyle } from "./Style";
import { useModalContext } from "../../../utils/helpers/context/modal-context/ModalContext";
import CloseIcon from "@mui/icons-material/Close";

const GeneralModal: React.FC = () => {
  const styles = modalStyle;
  const {
    modal: {
      open,
      form: { title, body },
    },
  } = useModalContext();
  const { handleModalClose } = useModal();

  window.addEventListener("popstate", () => {
    // close Modal when use press browser navigation
    handleModalClose();
  });

  React.useEffect(() => {
    const handlePopstate = () => {
      handleModalClose();
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [handleModalClose]);

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      slotProps={{
        backdrop: {
          timeout: 300,
        },
      }}
    >
      <Fade in={open}>
        <Paper sx={styles.modal}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            height={50}
            p={3}
          >
            {title}
            <IconButton onClick={handleModalClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <DialogContent sx={styles.body}>
            <Box>{body}</Box>
          </DialogContent>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default GeneralModal;
