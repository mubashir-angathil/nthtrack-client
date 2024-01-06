import { createTheme } from "@mui/material";
import { colors } from "./Colors";

const values = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

const fontFamily = "Open Sans";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#33691e",
    },
    background: {
      default: "#011612",
    },
    divider: colors.secondaryText,
  },
  typography: {
    fontFamily,
  },
  breakpoints: {
    values,
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#dcedc890",
    },
  },
  typography: {
    fontFamily,
  },
  breakpoints: {
    values,
  },
});
