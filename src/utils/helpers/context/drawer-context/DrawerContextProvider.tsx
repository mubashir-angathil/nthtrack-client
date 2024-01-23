import { useState } from "react";
import { DrawerContextProps } from "./Helper";
import { DrawerContext } from "./DrawerContext";
import { useMediaQuery } from "@mui/material";

export const DrawerContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Media query
  const matches = useMediaQuery("(min-width:600px)");

  // State hook to manage the Drawer state
  const [drawer, setDrawer] = useState<DrawerContextProps["drawer"]>({
    open: matches,
  });
  // Provide the DrawerContext with the current Drawer state and the function to update it
  return (
    <DrawerContext.Provider value={{ drawer, setDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};
