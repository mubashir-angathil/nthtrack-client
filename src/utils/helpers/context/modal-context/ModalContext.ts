import { createContext, useContext } from "react";
import { ModalContextProps, initialModalState } from "./Helper";

const ModalContext = createContext<ModalContextProps>({
  modal: initialModalState,
  setModal: () => {},
});

export const useModalContext = () => {
  const modalContext = useContext(ModalContext);
  if (!modalContext) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return modalContext;
};

export default ModalContext;
