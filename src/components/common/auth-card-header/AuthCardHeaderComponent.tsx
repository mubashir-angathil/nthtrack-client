import React from "react";
import { Box, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { AuthCardHeaderComponentProps } from "./Helper";

export const AuthCardHeaderComponent: React.FC<
  AuthCardHeaderComponentProps
> = ({ title }) => {
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
