import { Card, styled } from "@mui/material";

export const CustomCardComponent = styled(Card)(() => ({
  position: "absolute",
  transform: "translateX(50%) translateY(-50%)",
  right: "50%",
  top: "50%",
  padding: "0.5rem 1rem 1rem 1rem",
  minWidth: "350px",
  minHeight: "300px",
}));
