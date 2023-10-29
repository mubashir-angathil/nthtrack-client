import React from "react";
import { CustomButtonComponentProps } from "./Helper";
import { Button } from "@mui/material";
import { Update as UpdateIcon } from "@mui/icons-material";

const UpdateButtonComponent: React.FC<CustomButtonComponentProps> = ({
  title,
  ...rest
}) => {
  return (
    <Button
      disabled={rest.disabled}
      color="info"
      variant="contained"
      {...rest}
      endIcon={<UpdateIcon />}
    >
      {title}
    </Button>
  );
};

export default UpdateButtonComponent;
