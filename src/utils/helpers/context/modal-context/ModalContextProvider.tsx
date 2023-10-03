import { useState } from "react";
import ModalContext from "./ModalContext";
import { ModalContextProps, initialModalState } from "./Helper";

const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] =
    useState<ModalContextProps["modal"]>(initialModalState);
  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
