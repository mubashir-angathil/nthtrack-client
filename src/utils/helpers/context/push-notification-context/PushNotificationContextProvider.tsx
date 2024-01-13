import { useState } from "react";
import {
  PushNotificationContextProps,
  initialPushNotificationState,
} from "./Helper";
import { PushNotificationContext } from "./PushNotificationContext";

export const PushNotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // State hook to manage the pushNotification state
  const [pushNotification, setPushNotification] = useState<
    PushNotificationContextProps["pushNotification"]
  >(initialPushNotificationState);

  // Provide the pushNotificationContext with the current pushNotification state and the function to update it
  return (
    <PushNotificationContext.Provider
      value={{ pushNotification, setPushNotification }}
    >
      {children}
    </PushNotificationContext.Provider>
  );
};
