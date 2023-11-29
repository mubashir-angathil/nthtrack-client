import { SxProps } from "@mui/material";
export interface CustomButtonComponentProps {
  title: string;
  onClick?: () => void;
  sx?: SxProps;
  loading?: boolean;
  size?: "medium" | "small" | "large";
  disabled?: boolean;
  fullWidth?: boolean;
}
