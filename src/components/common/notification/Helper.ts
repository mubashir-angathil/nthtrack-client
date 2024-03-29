/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { socket } from "../../../services/api-instance/Instance";

import useSocketHelpers from "../../../socket/Socket";
import { useAuthContext } from "../../../utils/helpers/context/auth-context/AuthContext";
import { usePushNotificationContext } from "../../../utils/helpers/context/push-notification-context/PushNotificationContext";
import { useRefreshContext } from "../../../utils/helpers/context/refresh-context/RefreshContext";
import { ENV } from "../../../utils/helpers/configs/Configs";

// Custom hook for notification component
export const useNotifications = () => {
  const [anchorElNotifications, setAnchorElNotifications] =
    useState<null | HTMLElement>(null);

  const { joinRoom } = useSocketHelpers();
  const { authDetails } = useAuthContext();
  const { pushNotification, setPushNotification } =
    usePushNotificationContext();
  const { setRefresh } = useRefreshContext();

  // Track initial render
  const [isInitialRender, setIsInitialRender] = useState(true);

  // Define function to handle menu opening
  const handleOpenNotifications = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotifications(event.currentTarget);
  };

  // Define function to handle menu closing
  const handleCloseNotifications = () => {
    setAnchorElNotifications(null);
  };

  // Initiate socket connection
  useEffect(() => {
    // Connect socket
    socket.connect();

    // listen socket connection event
    socket.on("connect", () => {
      if (ENV === "development") console.info("User is active on " + socket.id);
    });

    // Close connection
    return () => {
      socket.close();
    };
  }, []);

  // Join rooms
  useEffect(() => {
    if (authDetails.auth && authDetails.user.id) {
      joinRoom({
        roomIds: [authDetails.user.id],
      });
    }
  }, [authDetails.auth]);

  // Listen notifications
  useEffect(() => {
    socket.on("push-notifications", (notificationCount: number | undefined) => {
      setPushNotification((prevNotificationCount) => {
        const newNotificationCount =
          notificationCount !== undefined
            ? prevNotificationCount.count + notificationCount
            : prevNotificationCount.count + 1;

        // Trigger refresh only after the initial render
        if (!isInitialRender) {
          setRefresh({ reload: newNotificationCount > 0 ? false : undefined });
        }

        return {
          count: newNotificationCount,
        };
      });

      // Update initial render status after the first update
      setIsInitialRender(false);
    });

    return () => {
      socket.off("push-notifications");
    };
  }, [socket, isInitialRender]);

  return {
    pushNotification,
    anchorElNotifications,
    handleOpenNotifications,
    handleCloseNotifications,
  };
};
