import { createContext, useContext } from "react";
import { ComponentPermissionContextProps } from "./Helper";

// Create a ComponentPermission context with default values
export const ComponentPermissionContext =
  createContext<ComponentPermissionContextProps>({
    componentPermission: {},
    setComponentPermission: () => {},
  });

// Custom hook to use the ComponentPermission context
export const useComponentPermissionContext = () => {
  // Access the project context
  const componentPermission = useContext(ComponentPermissionContext);

  // Throw an error if the hook is not used within a userPermissionProvider
  if (!componentPermission) {
    throw new Error(
      "useComponentPermission must be used within a ComponentPermissionProvider",
    );
  }

  return componentPermission;
};
