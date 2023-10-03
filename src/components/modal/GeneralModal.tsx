import React from "react";
import Modal from "@mui/material/Modal";
import { useModal } from "./Helper";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useModalContext } from "../../utils/helpers/context/modal-context/ModalContext";
import { modalStyle } from "./Style";

const GeneralModal: React.FC = () => {
  const styles = modalStyle;
  const {
    modal: { open, title, body, negativeButton, positiveButton },
  } = useModalContext();
  const { handleModalClose } = useModal();

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styles.modal}>
        <Typography variant="h5">{title}</Typography>
        <Divider />
        <Box>{body}</Box>
        <Box display="flex" justifyContent="end" columnGap={1}>
          <Button variant="outlined" color="error">
            {negativeButton}
          </Button>
          <Button variant="contained">{positiveButton}</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default GeneralModal;
