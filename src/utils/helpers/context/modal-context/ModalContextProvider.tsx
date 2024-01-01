import { useState } from "react";
import ModalContext from "./ModalContext";
import { ModalContextProps, initialModalState } from "./Helper";

const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
  // State to manage modal-related information
  const [modal, setModal] =
    useState<ModalContextProps["modal"]>(initialModalState);

  // Provide the modal state and setter through the context
  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
