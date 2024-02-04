import { useEffect, useState } from "react";
import { ApiRequestWithPaginationAndSearch } from "../../services/project-services/Helper";
import { enqueueSnackbar } from "notistack";
import { ApiError } from "../../services/Helper";
import dataServices from "../../services/data-services/DataServices";
import { Teams } from "../../services/data-services/Helper";
import { useAuthContext } from "../../utils/helpers/context/auth-context/AuthContext";
import { useAlertContext } from "../../utils/helpers/context/alert-context/AlertContext";
import { useAlert } from "../../components/common/alert/Helper";
import cookieServices from "../../services/storage-services/CookieServices";
import { initialAuthDetailsState } from "../../utils/helpers/context/auth-context/Helper";
import { useDrawerContext } from "../../utils/helpers/context/drawer-context/DrawerContext";
import { useMediaQuery } from "@mui/material";
import sessionServices from "../../services/storage-services/SessionServices";

// Define the shape of the API configuration
export interface ApiConfig extends ApiRequestWithPaginationAndSearch {
  hasMore: boolean;
}

export const paginationAndSearchConfiguration: ApiConfig = {
  page: 1,
  limit: 4,
  hasMore: true,
  searchKey: undefined,
};

export const useHome = () => {
  const matches = useMediaQuery("(min-width:960px)");
  const {
    authDetails: { auth, user },
    setAuthDetails,
  } = useAuthContext();
  const { setAlert } = useAlertContext();
  const { handleCloseAlert } = useAlert();
  const { drawer, setDrawer } = useDrawerContext();

  const [teams, setTeams] = useState<Teams["data"]>([]);

  // Function to fetch teams from the API
  const fetchTeams = async () => {
    try {
      // Call the API to get projects based on the current API configuration
      const response = await dataServices.getTeams();
      const {
        status,
        data: { data, message, success },
      } = response;

      // If the API call is successful, update projects and API configuration
      if (status === 200 && success) {
        setTeams(data);
      } else {
        // If there's an error, log the error message
        throw { data: message };
      }
    } catch (error) {
      // Handle API errors
      const { data } = error as ApiError;

      enqueueSnackbar({
        message: data?.message,
        variant: "error",
      });
    }
  };
  // Function to toggle the state of the drawer
  const toggleDrawerState = () => {
    setDrawer((prevState) => {
      return { open: !prevState.open };
    });
  };

  // Function to handle user logout
  const handleLogout = () => {
    // Display confirmation alert for logging out
    setAlert({
      open: true,
      alert: {
        title: "Logout",
        message: "Are you sure you want to sign out?",
        positiveButton: "Sign out",
        negativeButton: "Cancel",
        response: (response) => {
          handleCloseAlert();
          if (response === "accept") {
            // Clear authentication details on sign out
            Promise.resolve(cookieServices.clearAuthDetails());
            setAuthDetails(initialAuthDetailsState);
          }
        },
      },
    });
  };

  // useEffect to close the drawer when it is open on smaller screens
  useEffect(() => {
    if (drawer.open && !matches) {
      toggleDrawerState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches]);

  // useEffect to clear project from sessionStorage and fetch teams on component mount
  useEffect(() => {
    sessionServices.removeProject(); // Clear project from sessionStorage
    if (auth) {
      fetchTeams(); // Fetch teams on component mount
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    matches,
    teams,
    auth,
    user,
    drawer,
    handleLogout,
    toggleDrawerState,
  };
};
