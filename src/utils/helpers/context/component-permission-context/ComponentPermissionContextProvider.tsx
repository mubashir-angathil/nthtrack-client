import { useState } from "react";
import { ComponentPermissionContextProps } from "./Helper";
import { ComponentPermissionContext } from "./ComponentPermissionContext";

// Component to provide permission context
export const ComponentPermissionContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // State to hold the permission data
  const [componentPermission, setComponentPermission] = useState<
    ComponentPermissionContextProps["componentPermission"]
  >({});

  // Provide the permission context to the children
  return (
    <ComponentPermissionContext.Provider
      value={{ componentPermission, setComponentPermission }}
    >
      {children}
    </ComponentPermissionContext.Provider>
  );
};
