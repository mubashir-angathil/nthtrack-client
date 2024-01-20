export const taskCardStyle = {
  statusColumnContainer: {
    display: "flex",
    alignItems: "start",
    gap: 2,
    pb: 2,
    overscrollBehaviorInline: "contain",
    overflowX: "auto",
    "::-webkit-scrollbar": { display: "none" },
  },
  statusCard: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    border: 3,
    borderColor: "transparent",
    minWidth: 300,
    borderRadius: 2,
    p: 0.5,
  },
  statusCardHeader: {
    gap: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "white",
    border: "1px solid white",
    p: 1,
    borderRadius: 2,
  },
  taskCardStyle: {
    width: "100%",
    p: 2,
    mb: 1,
    border: 1,
    "&:hover": {
      cursor: "grab",
    },
    "&:active": {
      cursor: "grabbing",
    },
  },
  taskTitle: {
    lineHeight: 1.5,
    width: "90%",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    cursor: "pointer",
    ":hover": {
      color: "Highlight",
    },
  },
  additionalAvatar: {
    additionalAvatar: {
      sx: {
        width: 24,
        height: 24,
        fontSize: 15,
        background: "red",
      },
    },
  },
};
