import { Box, Button, Divider, Typography, colors } from "@mui/material";
import { FC } from "react";
import { useAlert } from "./Helper";

const alert = {
  width: "30vw",
  height: 200,
  position: "absolute",
  top: 200,
  right: "20vw",
  transform: "translate(-50%,10%)",
  backgroundColor: colors.grey[800],
  borderRadius: 2,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};
const AlertComponent: FC = () => {
  const {
    alert: {
      open,
      alert: { message, negativeButton, positiveButton, response, title },
    },
    handleCloseAlert,
  } = useAlert();

  return (
    <Box
      component="div"
      width="100vw"
      height="100vh"
      sx={{
        position: "fixed",
        top: 0,
        zIndex: 1,
        background: "rgba(0,0,0,0.5)",
        display: open ? "block" : "none",
      }}
    >
      <Box sx={alert} component="div" className="alert">
        <Box height={5}>
          <Box
            sx={{
              height: 20,
              m: 2,
            }}
          >
            <Typography variant="h5">{title}</Typography>
          </Box>
          <Divider />
        </Box>
        <Box sx={{ m: 2 }}>
          <Typography variant="h6">{message}</Typography>
        </Box>
        <Divider />
        <Box sx={{}} display="flex" gap={2}>
          <Button
            onClick={() => {
              handleCloseAlert();
              response("reject");
            }}
          >
            {negativeButton}
          </Button>
          <Button onClick={() => response("accept")}>{positiveButton}</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AlertComponent;
