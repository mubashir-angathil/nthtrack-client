import React from "react";
import { Box, Typography, Card } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { FormHeaderComponentProps } from "./Helper";
import { styled } from "@mui/system";

export const FormHeaderComponent: React.FC<FormHeaderComponentProps> = ({
  title,
}) => {
  return (
    <Box display="grid" sx={{ placeItems: "center" }}>
      <LockIcon
        sx={{ background: "lightGreen", p: 0.7, borderRadius: "20px" }}
      />
      <Typography component="div" variant="h5">
        {title}
      </Typography>
    </Box>
  );
};

export const CustomCardComponent = styled(Card)(() => ({
  position: "absolute",
  transform: "translateX(50%) translateY(-50%)",
  right: "50%",
  top: "50%",
  padding: "0.5rem 1rem 1rem 1rem",
  minWidth: "350px",
  minHeight: "300px",
}));

export const OutletWrapper = styled(Box)(() => ({
  height: "100vh",
  width: "100%",
  paddingTop: "4.5rem",
  paddingInline: "1.5rem",
}));
