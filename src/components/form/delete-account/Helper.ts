// Importing necessary dependencies and hooks
import { ChangeEvent, FormEvent, useState } from "react";
import { useDialog } from "../../common/dialog/Helper";
import { enqueueSnackbar } from "notistack";
import { ApiError } from "../../../services/Helper";
import Services from "../../../services/services/Services";
import { useAuthContext } from "../../../utils/helpers/context/auth-context/AuthContext";
import cookieServices from "../../../services/storage-services/CookieServices";
import { initialAuthDetailsState } from "../../../utils/helpers/context/auth-context/Helper";

// Custom hook for handling account deletion
export const useDeleteAccount = () => {
  // State and hook variables
  const [isMatchAccountName, setIsMatchAccountName] = useState<boolean>(false);
  const { authDetails, setAuthDetails } = useAuthContext();
  const { handleDialogClose } = useDialog();

  // Function to handle input change and check if the account name matches
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.target.value === authDetails?.user?.email) {
      setIsMatchAccountName(true);
    } else {
      setIsMatchAccountName(false);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (authDetails?.user?.id) {
      await deleteAccountPermanently({ userId: authDetails?.user?.id });
    }
  };

  // Function to fetch profile details
  const deleteAccountPermanently = async (props: { userId: number }) => {
    try {
      const response = await Services.deleteAccount(props);
      if (response.data.success && response.status === 200) {
        handleDialogClose();
        if (cookieServices.clearAuthDetails()) {
          setAuthDetails(initialAuthDetailsState);
        }
        enqueueSnackbar({ message: response.data.message, variant: "success" });
      } else {
        throw { data: { message: response.data.message } };
      }
    } catch (error) {
      const {
        data: { message },
      } = error as ApiError;
      enqueueSnackbar({ message, variant: "error" });
    }
  };

  // Returning relevant variables and functions
  return {
    email: authDetails?.user?.email,
    isMatchAccountName,
    handleSubmit,
    handleChange,
    handleDialogClose,
  };
};
