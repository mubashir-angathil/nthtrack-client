import React from "react";
import { CustomButtonComponentProps } from "./Helper";
import { LoadingButton } from "@mui/lab";

const SubmitButtonComponent: React.FC<CustomButtonComponentProps> = ({
  title,
  ...reset
}) => {
  return (
    <LoadingButton
      disabled={reset.disabled}
      type="submit"
      color="success"
      variant="contained"
      {...reset}
    >
      {title}
    </LoadingButton>
  );
};

export default SubmitButtonComponent;
