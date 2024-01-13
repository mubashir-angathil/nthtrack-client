import React from "react";

// Defining the shape of the drawer context state
export interface DrawerContextProps {
  drawer: DrawerProps; // State
  setDrawer: React.Dispatch<React.SetStateAction<DrawerProps>>; // Setter function
}

// Defining the properties of the Drawer state
interface DrawerProps {
  open: boolean; // A boolean property indicating whether to drawer open
}

// Initial state for the drawer context
export const initialDrawerState: DrawerProps = {
  open: true, // Initial value for the open property
};
