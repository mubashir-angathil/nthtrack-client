import React from "react";
import { CustomButtonComponentProps } from "./Helper";
import { LoadingButton } from "@mui/lab";

const SubmitButtonComponent: React.FC<CustomButtonComponentProps> = ({
  title,
  size = "small",
  ...reset
}) => {
  return (
    <LoadingButton type="submit" size={size} variant="contained" {...reset}>
      {title}
    </LoadingButton>
  );
};

export default SubmitButtonComponent;
