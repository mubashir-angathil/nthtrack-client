import React from "react";

// Interface for the modal context properties
export interface ModalContextProps {
  modal: ModalProps;
  setModal: React.Dispatch<React.SetStateAction<ModalProps>>;
}

// Interface for the modal properties
interface ModalProps {
  open: boolean;
  form: {
    title: string;
    body: React.ReactNode;
  };
}

// Initial state for the modal properties
export const initialModalState: ModalProps = {
  open: false,
  form: {
    title: "",
    body: "",
  },
};
