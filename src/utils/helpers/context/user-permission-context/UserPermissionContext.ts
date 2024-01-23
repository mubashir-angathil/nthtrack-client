import { createContext, useContext } from "react";
import { UserPermissionProps } from "./Helper";

// Create a UserPermission context with default values
export const UserPermission = createContext<UserPermissionProps>({
  permission: null,
  setPermission: () => {},
});

// Custom hook to use the UserPermission context
export const useUserPermissionContext = () => {
  // Access the UserPermission context
  const userPermission = useContext(UserPermission);

  // Throw an error if the hook is not used within a userPermissionProvider
  if (!userPermission) {
    throw new Error(
      "useUserPermission must be used within a UserPermissionProvider",
    );
  }

  return userPermission;
};
