import React from "react";
import { GoogleAuthButtonProps } from "./Helper";
import { Box, Button } from "@mui/material";
import GoogleSvg from "../../../assets/google.svg";

const GoogleAuthButtonComponent: React.FC<GoogleAuthButtonProps> = ({
  children,
  onClick,
  sx,
}) => {
  return (
    <Button
      sx={{
        ...sx,
        background: "white",
        color: "black",
        border: "0.5px solid rgba(0,0,0,0.1)",
        "&:hover": { background: "white", boxShadow: 1 },
      }}
      variant="contained"
      startIcon={<Box component="img" src={GoogleSvg} width={28} height={28} />}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default GoogleAuthButtonComponent;
