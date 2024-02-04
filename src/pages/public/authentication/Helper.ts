import { useTheme } from "@mui/material";

// Custom hook to generate styles for authentication pages
export const useAuthenticationStyle = (signInPage: boolean) => {
  // Access the current theme
  const theme = useTheme();

  // Determine background color based on the theme mode
  const backgroundColor =
    theme.palette.mode === "dark" ? "51, 105, 30" : "220, 237, 200";

  // Define styles based on the theme and page type
  const style = {
    // Styles for the main container
    containerStyles: {
      [theme.breakpoints.up("xs")]: {
        flexDirection: signInPage ? "column" : "column-reverse",
      },
      [theme.breakpoints.up("sm")]: {
        flexDirection: signInPage ? "column" : "column-reverse",
      },
      [theme.breakpoints.up("md")]: {
        display: "flex",
        flexDirection: signInPage ? "row" : "row-reverse",
      },
    },

    // Styles for the background section
    backgroundStyles: {
      background: `rgba(${backgroundColor},0.5)`,
      width: "100%",
      transition: "0.3s all",

      [theme.breakpoints.down(321)]: {
        borderBottomRightRadius: signInPage && 0,
        borderTopRightRadius: !signInPage && 0,
      },
      [theme.breakpoints.between(320, 376)]: {
        borderBottomRightRadius: signInPage && "50%",
        borderTopRightRadius: !signInPage && "50%",
      },
      [theme.breakpoints.up("xs")]: {
        minHeight: signInPage ? "45dvh" : "45dvh",
        height: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottomRightRadius: signInPage && "70%",
        borderTopRightRadius: !signInPage && "70%",
        paddingInline: 3,
        pt: 3,
        pb: 3,
      },
      [theme.breakpoints.up("sm")]: {
        height: "auto",
        minHeight: signInPage ? "55dvh" : "40dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingInline: 5,
        pt: signInPage ? 1 : 3,
        pb: signInPage ? 1 : 3,
        borderBottomRightRadius: signInPage && "70%",
        borderTopRightRadius: !signInPage && "70%",
      },
      [theme.breakpoints.up("md")]: {
        width: "60%",
        height: "auto",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingInline: 5,
        borderTopRightRadius: 0,
        borderBottomRightRadius: signInPage && "70%",
        borderBottomLeftRadius: !signInPage && "70%",
      },
    },

    // Styles for the information section
    infoStyles: {
      [theme.breakpoints.up("sm")]: {
        display: "flex",
        flexDirection: "row",
        gap: 0,
      },
      [theme.breakpoints.up("md")]: {
        display: "flex",
        flexDirection: "column",
        gap: 2,
      },
      [theme.breakpoints.up("lg")]: {},
      [theme.breakpoints.up("xl")]: {},
    },

    // Styles for the caption
    caption: {
      [theme.breakpoints.down(320)]: {
        mr: !signInPage && 0,
      },
      [theme.breakpoints.between(320, 375)]: {
        mr: !signInPage && 5,
      },
      [theme.breakpoints.up("xs")]: {
        fontSize: "0.9rem",
        mr: !signInPage && 12,
      },
      [theme.breakpoints.up("sm")]: {
        mr: 0,
      },
    },

    // Styles for the button
    buttonStyles: {
      borderRadius: 5,
      position: "relative",
      zIndex: 1,
      top: 10,

      [theme.breakpoints.up("xs")]: {
        mb: 2,
      },
    },

    // Styles for the image
    imageStyles: {
      [theme.breakpoints.down(320)]: {
        width: "auto",
        height: 90,
        float: "right",
        mr: !signInPage && 2,
      },
      [theme.breakpoints.between(320, 376)]: {
        width: "auto",
        float: "right",
        height: signInPage ? 90 : 100,
        top: -20,
        left: signInPage ? -50 : -30,
      },
      [theme.breakpoints.up("xs")]: {
        height: 120,
        width: "100%",
        position: "relative",
        top: -20,
        left: signInPage ? -19 : 20,
        transform: signInPage && "scaleX(-1)",
      },
      [theme.breakpoints.up("sm")]: {
        height: 100,
        width: "100%",
        position: "relative",
        top: signInPage ? 10 : 50,
        left: !signInPage && -9,
        transform: signInPage && "scaleX(-1)",
      },
      [theme.breakpoints.up("md")]: {
        width: "100%",
        height: 170,
        position: "relative",
        left: signInPage ? -29 : 0,
        top: 0,
      },
    },

    // Styles for the form container wrapper
    formConfinerWrapper: {
      [theme.breakpoints.up("xs")]: {
        minHeight: signInPage ? "55dvh" : "60dvh",
        height: "auto",
        pt: 3,
        pb: 5,
        width: "100%",
        display: "flex",
        alignItems: !signInPage && "center",
        justifyContent: "center",
      },
      [theme.breakpoints.up("sm")]: {
        minHeight: signInPage ? "45dvh" : "50dvh",
        height: "auto",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pt: 3,
        pb: 3,
      },
      [theme.breakpoints.up("md")]: {
        width: "40%",
        height: "auto",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },

    // Styles for the form container
    formContainer: {
      [theme.breakpoints.down(376)]: {
        width: "100%",
        paddingInline: 3,
      },
      [theme.breakpoints.up("xs")]: {
        width: 320,
      },
      [theme.breakpoints.up("sm")]: {
        width: 300,
      },
      [theme.breakpoints.up("md")]: {
        width: 300,
      },
    },
  };

  return style;
};
