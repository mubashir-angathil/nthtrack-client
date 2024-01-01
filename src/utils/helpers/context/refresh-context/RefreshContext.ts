import { createContext, useContext } from "react";
import { RefreshContextProps, initialRefreshState } from "./Helper";

// Creating the RefreshContext with default values
export const RefreshContext = createContext<RefreshContextProps>({
  refresh: initialRefreshState,
  setRefresh: () => {},
});

// Custom hook to consume the RefreshContext
export const useRefreshContext = () => {
  const refreshContext = useContext(RefreshContext);

  // Throw an error if the hook is used outside of the context provider
  if (!refreshContext) {
    throw new Error("useRefreshContext must be used within a FormProvider");
  }

  return refreshContext;
};
