/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, SyntheticEvent } from "react";
import { socket } from "../../../services/api-instance/Instance";
import dataServices from "../../../services/data-services/DataServices";
import {
  GetNotificationRequest,
  GetNotificationResponse,
} from "../../../services/data-services/Helper";
import { enqueueSnackbar } from "notistack";
import { ApiError, ApiRequestWithPagination } from "../../../services/Helper";
import useSocketHelpers from "../../../socket/Socket";
import projectServices from "../../../services/project-services/ProjectServices";
import { MarkNotificationsAsReadRequest } from "../../../services/project-services/Helper";
import { useAuthContext } from "../../../utils/helpers/context/auth-context/AuthContext";
import generalFunctions from "../../../utils/helpers/functions/GeneralFunctions";
import { useRefreshContext } from "../../../utils/helpers/context/refresh-context/RefreshContext";

interface InitialNotificationDetailsConfigType {
  notifications: GetNotificationResponse["data"];
  notificationCount: number;
}
interface InitialNotificationConfigType extends ApiRequestWithPagination {
  hasMore: boolean;
  totalRows: number;
}
const initialNotificationConfig = {
  page: 1,
  limit: 5,
  hasMore: true,
  totalRows: 0,
};
const initialNotificationDetailsConfig: InitialNotificationDetailsConfigType = {
  notifications: [],
  notificationCount: 0,
};

// Custom hook for notification component
export const useNotifications = () => {
  const [projectIds, setProjectIds] = useState<number[] | null>(null);
  const [anchorElNotifications, setAnchorElNotifications] =
    useState<null | HTMLElement>(null);

  // Declare state variable for hold notification API request details
  const [notificationConfig, setNotificationConfig] =
    useState<InitialNotificationConfigType>(initialNotificationConfig);

  // Declare state variable for hold notification API response details
  const [notificationDetails, setNotificationsDetails] =
    useState<InitialNotificationDetailsConfigType>(
      initialNotificationDetailsConfig,
    );
  const { joinRoom } = useSocketHelpers();
  const { authDetails } = useAuthContext();
  const { setRefresh } = useRefreshContext();

  // Define function to handle menu opening
  const handleOpenNotifications = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotifications(event.currentTarget);
  };

  // Define function to handle menu closing
  const handleCloseNotifications = () => {
    const notificationIds = notificationDetails.notifications.map(
      (notification) => notification.id,
    );

    if (notificationIds.length > 0) {
      setNotificationConfig(initialNotificationConfig);

      setNotificationsDetails((prevNotificationDetails) => {
        return {
          notifications: [],
          notificationCount:
            prevNotificationDetails.notificationCount - notificationIds.length,
        };
      });

      (async () =>
        await markNotificationsAsRead({
          notificationIds,
        }))();
      setRefresh({ reload: true });
    }
    setAnchorElNotifications(null);
  };

  const markNotificationsAsRead = async (
    props: MarkNotificationsAsReadRequest,
  ) => {
    try {
      await projectServices.markNotificationsAsRead(props);
    } catch (error) {
      const {
        data: { message },
      } = error as ApiError;
      enqueueSnackbar({ message, variant: "error" });
    }
  };

  // Event handler for handling project loading (e.g., on scroll)
  const handleNotificationLoading = (e: SyntheticEvent) => {
    const loadMore = generalFunctions.batchLoading(e);
    // If there's more to load and the API configuration allows it, update the page number
    if (loadMore && notificationConfig.hasMore && anchorElNotifications) {
      setNotificationConfig((prevConfig) => ({
        ...prevConfig,
        page: prevConfig.page + 1,
      }));
    }
  };
  const fetchNotifications = (props: GetNotificationRequest) => {
    dataServices
      .getNotifications(props)
      .then((response) => {
        const {
          status,
          data: { data, success, totalRows },
        } = response;
        if (success && status === 200) {
          setNotificationsDetails((prevNotificationDetails) => {
            const notifications =
              prevNotificationDetails.notifications.concat(data);
            return { ...prevNotificationDetails, notifications };
          });
          setNotificationConfig((prevConfig) => {
            const hasMore =
              prevConfig.totalRows !==
              data.length + notificationDetails.notifications.length;
            return { ...prevConfig, totalRows, hasMore };
          });
        }
      })
      .catch((error: ApiError) =>
        enqueueSnackbar({ message: error.data.message, variant: "error" }),
      );
  };
  // Initiate socket connection
  useEffect(() => {
    // Connect socket
    socket.connect();

    // listen socket connection event
    socket.on("connect", () => {
      console.info("User is active on " + socket.id);
    });

    // Close connection
    return () => {
      socket.close();
    };
  }, []);

  // Join rooms
  useEffect(() => {
    if (
      projectIds &&
      projectIds.length > 0 &&
      authDetails.auth &&
      authDetails.user.id
    ) {
      joinRoom({
        roomIds: [...projectIds, authDetails.user.id],
      });
    }
  }, [projectIds]);

  // Listen notifications
  useEffect(() => {
    socket.on("receive-notifications", (notificationCount) => {
      if (notificationCount > 0) {
        setNotificationsDetails((prevNotificationDetails) => {
          return {
            ...prevNotificationDetails,
            notificationCount:
              prevNotificationDetails.notificationCount + notificationCount,
          };
        });
      }
    });
    return () => {
      socket.off("receive-notifications");
    };
  }, [socket]);

  useEffect(() => {
    if (anchorElNotifications && projectIds && notificationConfig.hasMore) {
      fetchNotifications({
        roomIds: projectIds,
        limit: notificationConfig.limit,
        page: notificationConfig.page,
      });
    }
  }, [anchorElNotifications, notificationConfig.page]);

  useEffect(() => {
    const fetchProjectIds = () => {
      dataServices
        .getEnrolledProjectIds()
        .then((response) => {
          const {
            data: { data },
          } = response;
          setProjectIds(data);
        })
        .catch((error: ApiError) =>
          enqueueSnackbar({ message: error.data.message, variant: "error" }),
        );
    };
    fetchProjectIds();
  }, []);

  return {
    handleNotificationLoading,
    notificationDetails,
    anchorElNotifications,
    handleOpenNotifications,
    handleCloseNotifications,
  };
};
