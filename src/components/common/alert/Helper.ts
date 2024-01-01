import { useAlertContext } from "../../../utils/helpers/context/alert-context/AlertContext";
import { initialAlertState } from "../../../utils/helpers/context/alert-context/Helper";

export const useAlert = () => {
  const { alert, setAlert } = useAlertContext();
  const handleCloseAlert = () => {
    setAlert(initialAlertState);
  };
  return { handleCloseAlert, alert };
};
