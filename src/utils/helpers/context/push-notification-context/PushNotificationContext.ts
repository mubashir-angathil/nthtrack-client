import { createContext, useContext } from "react";
import {
  PushNotificationContextProps,
  initialPushNotificationState,
} from "./Helper";

// Creating the pushNotificationContext with default values
export const PushNotificationContext =
  createContext<PushNotificationContextProps>({
    pushNotification: initialPushNotificationState,
    setPushNotification: () => {},
  });

// Custom hook to consume the pushNotificationContext
export const usePushNotificationContext = () => {
  const pushNotificationContext = useContext(PushNotificationContext);

  // Throw an error if the hook is used outside of the context provider
  if (!pushNotificationContext) {
    throw new Error(
      "usePushNotificationContext must be used within a FormProvider",
    );
  }

  return pushNotificationContext;
};
