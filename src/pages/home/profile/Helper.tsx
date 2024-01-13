import { enqueueSnackbar } from "notistack";
import { ApiError } from "../../../services/Helper";
import Services from "../../../services/services/Services";
import { ChangeEvent, useEffect, useState } from "react";
import { useAuthContext } from "../../../utils/helpers/context/auth-context/AuthContext";
import {
  UerProfileResponse,
  UpdateProfileDetails,
} from "../../../services/services/Helper";
import cookieServices from "../../../services/storage-services/CookieServices";
import { useDialogContext } from "../../../utils/helpers/context/dialog-context/DialogContext";
import DeleteAccount from "../../../components/form/delete-account/DeleteAccount";
import generalFunctions from "../../../utils/helpers/functions/GeneralFunctions";

export const useProfileManagement = () => {
  const { authDetails, setAuthDetails } = useAuthContext();
  const { setDialog } = useDialogContext();
  const [profileDetails, setProfileDetails] = useState<
    UerProfileResponse["data"]
  >({
    id: 0,
    username: "",
    email: "",
    totalProjects: 0,
    totalContributedProjects: 0,
    createdAt: "",
  });
  const [form, setForm] = useState<{ username: string | null }>({
    username: null,
  });
  const [error, setError] = useState<{ username: string } | undefined>();

  // Function to handle textField change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ username: e.target.value });
  };

  // Function to handle username change
  const handleChangeUserName = () => {
    setForm((prevState) => {
      return {
        username: prevState.username === null ? profileDetails.username : null,
      };
    });
    if (error) {
      setError(undefined);
    }
  };

  // Function to save the changes
  const handleSaveChanges = () => {
    if (form.username) {
      updateProfileDetails({
        userId: profileDetails.id,
        username: generalFunctions.capitalizeString(form.username),
      });
    }
  };

  // Function to handle account deletion
  const handleDeleteAccount = () => {
    setDialog({
      open: true,
      form: {
        title: "Delete Account",
        body: <DeleteAccount />,
      },
    });
  };

  // Function to update profile details
  const updateProfileDetails = async (props: UpdateProfileDetails) => {
    try {
      const response = await Services.updateProfileDetails(props);
      if (response.data.success && response.status === 200) {
        if (props.username) {
          setProfileDetails({ ...profileDetails, username: props.username });
          const newAuthDetails = cookieServices.updateUserName(props.username);
          if (newAuthDetails) {
            setAuthDetails({
              auth: true,
              user: newAuthDetails,
            });
          }
          setForm({ username: null });
          if (error) {
            setError(undefined);
          }
        }
        enqueueSnackbar({ message: response.data.message, variant: "success" });
      }
    } catch (error) {
      const { data } = error as ApiError;

      if (data?.error?.fieldErrors) {
        setError({ username: data?.error?.fieldErrors[0].message });
        enqueueSnackbar({
          message: data?.error?.fieldErrors[0].message,
          variant: "error",
        });
      }
    }
  };

  // Function to fetch profile details
  const fetchProfileDetails = async (props: { userId: number }) => {
    try {
      const response = await Services.getProfileDetails(props);
      if (response.data.success && response.status === 200) {
        setProfileDetails(response.data.data);
      } else {
        throw { data: { message: "wrong" } };
      }
    } catch (error) {
      const {
        data: { message },
      } = error as ApiError;
      enqueueSnackbar({ message, variant: "error" });
    }
  };

  // Effect to call fetchProfileDetails API
  useEffect(() => {
    if (authDetails.auth && authDetails?.user?.id) {
      fetchProfileDetails({ userId: authDetails.user.id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    form,
    error,
    profileDetails,
    handleChange,
    handleChangeUserName,
    handleSaveChanges,
    handleDeleteAccount,
  };
};
