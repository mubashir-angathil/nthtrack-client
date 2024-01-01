// Importing the useModalContext hook from the specified path
import { useModalContext } from "../../../utils/helpers/context/modal-context/ModalContext";

// Custom hook for managing modal functionality
export const useModal = () => {
  // Destructuring modal state and setModal function from the context
  const { modal, setModal } = useModalContext();

  // Function to handle closing the modal by updating its 'open' property to false
  const handleModalClose = () => {
    setModal({ ...modal, open: false });
  };

  // Returning the function to close the modal
  return { handleModalClose };
};
