import generalFunctions from "../../../utils/helpers/functions/GeneralFunctions";

/**
 * projectCardStyle
 *
 * Object containing styles for the ProjectCardComponent.
 */
export const projectCardStyle = {
  projectCardWrapper: {
    overflowY: "auto",
    height: "calc(100dvh - 25dvh)",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "start",
    alignItems: "baseline",
  },
  cardStyle: {
    m: 2,
    minWidth: 250,
    flexBasis: 300,
    flexGrow: 1,
    height: 220,
    borderRadius: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  projectTitle: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    cursor: "pointer",
    "&:hover": {
      color: "Highlight",
      textDecoration: "underline",
    },
  },
  description: {
    height: 70,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "normal",
  },
  footerWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    p: 1,
    paddingInline: 1.8,
  },
  additionalAvatarStyle: {
    sx: {
      width: 24,
      height: 24,
      fontSize: 15,
      background: generalFunctions.getColor(),
      color: "white",
    },
  },
};
