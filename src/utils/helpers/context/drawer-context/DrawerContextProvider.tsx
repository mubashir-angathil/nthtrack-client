import { useState } from "react";
import { DrawerContextProps, initialDrawerState } from "./Helper";
import { DrawerContext } from "./DrawerContext";

export const DrawerContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // State hook to manage the Drawer state
  const [drawer, setDrawer] =
    useState<DrawerContextProps["drawer"]>(initialDrawerState);

  // Provide the DrawerContext with the current Drawer state and the function to update it
  return (
    <DrawerContext.Provider value={{ drawer, setDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};
