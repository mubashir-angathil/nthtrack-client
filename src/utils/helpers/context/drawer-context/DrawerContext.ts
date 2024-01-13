import { createContext, useContext } from "react";
import { DrawerContextProps, initialDrawerState } from "./Helper";

// Creating the DrawerContext with default values
export const DrawerContext = createContext<DrawerContextProps>({
  drawer: initialDrawerState,
  setDrawer: () => {},
});

// Custom hook to consume the DrawerContext
export const useDrawerContext = () => {
  const drawerContext = useContext(DrawerContext);

  // Throw an error if the hook is used outside of the context provider
  if (!drawerContext) {
    throw new Error("useDrawerContext must be used within a FormProvider");
  }

  return drawerContext;
};
