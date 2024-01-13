/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { socket } from "../../../services/api-instance/Instance";

import useSocketHelpers from "../../../socket/Socket";
import { useAuthContext } from "../../../utils/helpers/context/auth-context/AuthContext";
import { usePushNotificationContext } from "../../../utils/helpers/context/push-notification-context/PushNotificationContext";

// Custom hook for notification component
export const useNotifications = () => {
  const [anchorElNotifications, setAnchorElNotifications] =
    useState<null | HTMLElement>(null);

  const { joinRoom } = useSocketHelpers();
  const { authDetails } = useAuthContext();
  const { pushNotification, setPushNotification } =
    usePushNotificationContext();
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
      console.info("User is active on " + socket.id);
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

        return {
          count: newNotificationCount,
        };
      });
    });
    return () => {
      socket.off("push-notifications");
    };
  }, [socket]);

  return {
    pushNotification,
    anchorElNotifications,
    handleOpenNotifications,
    handleCloseNotifications,
  };
};
