import { useState } from "react";
import DialogContext from "./DialogContext";
import { DialogContextProps, initialDialogState } from "./Helper";

const DialogContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [dialog, setDialog] =
    useState<DialogContextProps["dialog"]>(initialDialogState);
  return (
    <DialogContext.Provider value={{ dialog, setDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

export default DialogContextProvider;
