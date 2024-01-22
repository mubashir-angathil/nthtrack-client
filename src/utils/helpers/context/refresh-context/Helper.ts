import React from "react";

// Defining the shape of the refresh context state
export interface RefreshContextProps {
  refresh: RefreshProps; // State
  setRefresh: React.Dispatch<React.SetStateAction<RefreshProps>>; // Setter function
}

// Defining the properties of the refresh state
interface RefreshProps {
  reload?: boolean; // A boolean property indicating whether to trigger a reload
}

// Initial state for the refresh context
export const initialRefreshState: RefreshProps = {
  reload: undefined, // Initial value for the reload property
};
