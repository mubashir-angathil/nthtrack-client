import React from "react";

export interface ModalContextProps {
  modal: ModalProps;
  setModal: React.Dispatch<React.SetStateAction<ModalProps>>;
}

interface ModalProps {
  open: boolean;
  title: string;
  body: React.ReactNode;
  positiveButton: string;
  negativeButton: string;
}

export const initialModalState = {
  open: false,
  title: "",
  body: "",
  negativeButton: "",
  positiveButton: "",
};
