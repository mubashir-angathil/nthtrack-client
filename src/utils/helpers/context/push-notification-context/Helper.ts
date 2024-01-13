import React from "react";

// Defining the shape of the pushNotification context state
export interface PushNotificationContextProps {
  pushNotification: PushNotificationProps; // State
  setPushNotification: React.Dispatch<
    React.SetStateAction<PushNotificationProps>
  >; // Setter function
}

// Defining the properties of the pushNotification state
interface PushNotificationProps {
  count: number; // A boolean property indicating whether to trigger a reload
}

// Initial state for the pushNotification context
export const initialPushNotificationState: PushNotificationProps = {
  count: 0, // Initial value for the reload property
};
