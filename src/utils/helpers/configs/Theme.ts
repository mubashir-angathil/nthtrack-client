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
      paper: "#101e1b",
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
  components: {
    // MuiTabs: {
    //   styleOverrides: {
    //     root: {
    //       minHeight: "35px",
    //     },
    //     indicator: {
    //       display: "none",
    //     },
    //   },
    // },
    // MuiTab: {
    //   styleOverrides: {
    //     root: {
    //       minHeight: "35px",
    //       height: "35px",
    //       border: "1px solid transparent",
    //       borderRadius: 50,

    //       "&.Mui-selected": {
    //         borderColor: "#33691e",
    //         background: "#101e1b",
    //       },
    //     },
    //   },
    // },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#101e1b",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: 20,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            border: "1.5px solid #33691e",
          },
        },
      },
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ffbf00", //"#dcedc890",
    },
    background: {
      default: "rgba(220, 237, 200, 0.082)",
    },
  },
  typography: {
    fontFamily,
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: 20,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "rgba(220, 237, 200, 0.29)",
            // border: "1.5px solid #dcedc890",
          },
        },
      },
    },
  },
  breakpoints: {
    values,
  },
});
