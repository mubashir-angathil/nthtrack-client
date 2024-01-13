import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../../utils/helpers/context/auth-context/AuthContext";
import {
  GetNotificationRequest,
  GetNotificationResponse,
  MarkNotificationsAsReadRequest,
} from "../../../../services/services/Helper";
import projectServices from "../../../../services/project-services/ProjectServices";
import { ApiError } from "../../../../services/Helper";
import services from "../../../../services/services/Services";
import { ApiRequestWithPaginationAndSearch } from "../../../../services/project-services/Helper";
import generalFunctions from "../../../../utils/helpers/functions/GeneralFunctions";
import { usePushNotificationContext } from "../../../../utils/helpers/context/push-notification-context/PushNotificationContext";

interface PaginationInterface extends GetNotificationRequest {
  hasMore: boolean;
}

export const useManageNotifications = ({
  refresh,
  newNotificationsOnly,
}: {
  refresh?: boolean;
  newNotificationsOnly?: boolean;
}) => {
  const [tab, setTab] = useState("All");
  const {
    authDetails: { user },
  } = useAuthContext();
  const { setPushNotification } = usePushNotificationContext();
  const [pagination, setPagination] = useState<PaginationInterface>({
    page: 1,
    limit: 5,
    hasMore: true,
  });

  const [notifications, setNotifications] =
    useState<GetNotificationResponse["data"]>();

  // Function to handle loading of notifications
  const handleNotificationLoad = (
    event: React.SyntheticEvent<Element, Event>,
  ) => {
    const load = generalFunctions.batchLoading(event);
    if (load && pagination.hasMore) {
      setPagination((prevState) => {
        return { ...prevState, page: prevState.page + 1 };
      });
    }
  };

  // Function to handle  invitation
  const handleInvitation = ({
    type,
    projectId,
    notificationId,
  }: {
    type: "accept" | "reject";
    projectId: number | null;
    notificationId: number;
  }) => {
    if (projectId) {
      if (type === "accept") {
        acceptInvitation({ projectId, notificationId });
      } else if (type === "reject") {
        rejectInvitation({ projectId, notificationId });
      }
    } else {
      enqueueSnackbar({
        message: "Reference is missing, try agin!!",
        variant: "error",
      });
    }
  };

  // API to handle accept invitation
  const acceptInvitation = async ({
    projectId,
    notificationId,
  }: {
    projectId: number;
    notificationId: number;
  }) => {
    try {
      markNotificationsAsRead({ notificationId });
      const response = await projectServices.acceptInvitation({ projectId });
      if (response.status === 200 && response.data.success) {
        enqueueSnackbar({ message: response.data.message, variant: "success" });
      } else {
        throw { data: { message: response.data.message } };
      }
    } catch (error) {
      const { data } = error as ApiError;
      enqueueSnackbar({ message: data.message, variant: "error" });
    }
  };

  // API to handle reject invitation
  const rejectInvitation = async ({
    projectId,
    notificationId,
  }: {
    projectId: number;
    notificationId: number;
  }) => {
    try {
      markNotificationsAsRead({ notificationId });
      const response = await projectServices.rejectInvitation({ projectId });
      if (response.status === 200 && response.data.success) {
        enqueueSnackbar({ message: response.data.message, variant: "success" });
      } else {
        throw { data: { message: response.data.message } };
      }
    } catch (error) {
      const { data } = error as ApiError;
      enqueueSnackbar({ message: data.message, variant: "error" });
    }
  };

  // API to mark notification as read
  const markNotificationsAsRead = async (
    props: MarkNotificationsAsReadRequest,
  ) => {
    try {
      const response = await services.markNotificationsAsRead(props);
      if (response.status === 200 && response.data.success) {
        setNotifications((prevNotifications) => {
          let updatedNotifications;

          if (prevNotifications) {
            updatedNotifications = prevNotifications?.map((notification) => {
              if (notification.id === props.notificationId && user.id) {
                return {
                  ...notification,
                  readersIds: [...notification.readersIds, user.id],
                };
              }
              return notification;
            });
          }
          return updatedNotifications;
        });
      } else {
        throw { data: { message: response.data.message } };
      }
    } catch (error) {
      const { data } = error as ApiError;
      enqueueSnackbar({ message: data.message, variant: "error" });
    }
  };

  // API retrieves notifications
  const fetchNotifications = async (
    props: ApiRequestWithPaginationAndSearch,
    newNotificationsOnly?: boolean,
  ) => {
    try {
      const response = await services.getNotifications(
        props,
        newNotificationsOnly,
      );
      if (response.data.success && response.status === 200) {
        if (notifications) {
          setPagination((prevState) => {
            const totalNotificationFetched =
              notifications?.length + response.data.data.length;

            return {
              ...prevState,
              hasMore:
                totalNotificationFetched === response.data.totalRows
                  ? false
                  : true,
            };
          });
        }
        setNotifications((prevState) => {
          return prevState
            ? prevState.concat(response.data.data)
            : response.data.data;
        });

        if (newNotificationsOnly && response.data.data.length > 0) {
          const notificationsIds = response.data.data
            .map((notification) =>
              notification.type !== "Invite" ? notification.id : -1,
            )
            .filter((id) => id !== -1);

          notificationsIds.length > 0 &&
            (await markNotificationsAsRead({
              notificationId: notificationsIds,
            }));
        }
      } else {
        throw { data: { message: response.data.message } };
      }
    } catch (error) {
      const { data } = error as ApiError;
      enqueueSnackbar({ message: data.message, variant: "error" });
    }
  };

  useEffect(() => {
    fetchNotifications(pagination, newNotificationsOnly);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.type, refresh]);

  useEffect(() => {
    setNotifications([]);
    switch (tab) {
      case "All":
        setPagination((prevState) => {
          return { ...prevState, type: undefined, page: 1 };
        });
        break;
      case "Invites":
        setPagination((prevState) => {
          return { ...prevState, type: "Invite", page: 1 };
        });
        break;
      case "Mentions":
        setPagination((prevState) => {
          return { ...prevState, type: "Mention", page: 1 };
        });
    }
  }, [tab]);

  useEffect(() => {
    return () => {
      setPushNotification({ count: 0 });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    notifications,
    tab,
    setTab,
    handleNotificationLoad,
    handleInvitation,
  };
};
