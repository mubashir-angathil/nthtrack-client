import { useState } from "react";
import { AlertContext } from "./AlertContext";
import { AlertContextProps, initialAlertState } from "./Helper";
export const AlertContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [alert, setAlert] =
    useState<AlertContextProps["alert"]>(initialAlertState);
  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
