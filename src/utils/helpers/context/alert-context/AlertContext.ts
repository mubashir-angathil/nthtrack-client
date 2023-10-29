import { createContext, useContext } from "react";
import { AlertContextProps, initialAlertState } from "./Helper";
export const AlertContext = createContext<AlertContextProps>({
  alert: initialAlertState,
  setAlert: () => {},
});

export const useAlertContext = () => {
  const alertContext = useContext(AlertContext);

  if (!alertContext) {
    throw new Error("useAlertContext must be used within a FormProvider");
  }

  return alertContext;
};
