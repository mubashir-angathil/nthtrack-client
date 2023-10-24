import React from "react";

export interface DialogContextProps {
  dialog: DialogProps;
  setDialog: React.Dispatch<React.SetStateAction<DialogProps>>;
}

interface DialogProps {
  open: boolean;
  title: string;
  body: React.ReactNode;
  positiveButton: string;
  negativeButton: string;
}

export const initialDialogState = {
  open: false,
  title: "",
  body: "",
  negativeButton: "",
  positiveButton: "",
};
