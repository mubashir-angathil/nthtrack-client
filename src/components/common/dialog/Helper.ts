import { useDialogContext } from "../../../utils/helpers/context/dialog-context/DialogContext";

export const useDialog = () => {
  const { dialog, setDialog } = useDialogContext();

  const handleDialogClose = () => {
    setDialog({ ...dialog, open: !dialog.open });
  };
  return { handleDialogClose };
};
