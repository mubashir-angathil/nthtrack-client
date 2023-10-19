import React from "react";
import { Button } from "@mui/material";
import { CustomButtonComponentProps } from "./Helper";

const SubmitButtonComponent: React.FC<CustomButtonComponentProps> = ({
  title,
  onClick,
  sx,
}) => {
  return (
    <Button
      sx={sx}
      type="submit"
      color="success"
      variant="contained"
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default SubmitButtonComponent;
