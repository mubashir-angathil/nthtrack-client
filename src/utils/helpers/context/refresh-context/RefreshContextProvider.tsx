import { useState } from "react";
import { RefreshContextProps, initialRefreshState } from "./Helper";
import { RefreshContext } from "./RefreshContext";

export const RefreshContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // State hook to manage the refresh state
  const [refresh, setRefresh] =
    useState<RefreshContextProps["refresh"]>(initialRefreshState);

  // Provide the RefreshContext with the current refresh state and the function to update it
  return (
    <RefreshContext.Provider value={{ refresh, setRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};
