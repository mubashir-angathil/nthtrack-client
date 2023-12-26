// useDialog: Custom hook for managing dialog state and actions.

import { useDialogContext } from "../../../utils/helpers/context/dialog-context/DialogContext";

export const useDialog = () => {
  const { dialog, setDialog } = useDialogContext();

  // Function to close the dialog
  const handleDialogClose = () => {
    setDialog({ ...dialog, open: false });
  };

  return { handleDialogClose };
};
