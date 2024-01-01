import { createContext, useContext } from "react";
import { ModalContextProps, initialModalState } from "./Helper";

// Create a React context with initial values
const ModalContext = createContext<ModalContextProps>({
  modal: initialModalState,
  setModal: () => {},
});

// Custom hook for consuming the ModalContext
export const useModalContext = () => {
  // Use the useContext hook to access the ModalContext
  const modalContext = useContext(ModalContext);

  // Throw an error if the hook is used outside the context provider
  if (!modalContext) {
    throw new Error(
      "useModalContext must be used within a ModalContextProvider",
    );
  }

  // Return the modal context
  return modalContext;
};

export default ModalContext;
