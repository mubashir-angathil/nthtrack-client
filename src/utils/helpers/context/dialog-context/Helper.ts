import React from "react";

export interface DialogContextProps {
  dialog: DialogProps;
  setDialog: React.Dispatch<React.SetStateAction<DialogProps>>;
}

interface DialogProps {
  open: boolean;
  form: {
    title: string;
    body: React.ReactNode;
  };
}

export const initialDialogState: DialogProps = {
  open: false,
  form: {
    title: "",
    body: "",
  },
};
