import { SxProps } from "@mui/material";
export interface CustomButtonComponentProps {
  title: string;
  onClick?: () => void;
  sx?: SxProps;
}
