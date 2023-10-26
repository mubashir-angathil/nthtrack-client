import { createTheme } from "@mui/material";
import { colors } from "./Colors";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colors.primary, //"#fb8c00",
    },
    secondary: {
      main: colors.secondary,
    },
  },
});
