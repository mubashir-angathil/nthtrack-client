import { useModalContext } from "../../../utils/helpers/context/modal-context/ModalContext";

export const useModal = () => {
  const { modal, setModal } = useModalContext();

  const handleModalClose = () => {
    setModal({ ...modal, open: !modal.open });
  };
  return { handleModalClose };
};
