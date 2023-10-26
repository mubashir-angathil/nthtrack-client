import { createContext, useContext } from "react";
import { DialogContextProps, initialDialogState } from "./Helper";

const DialogContext = createContext<DialogContextProps>({
  dialog: initialDialogState,
  setDialog: () => {},
});

export const useDialogContext = () => {
  const dialogContext = useContext(DialogContext);
  if (!DialogContext) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return dialogContext;
};

export default DialogContext;
