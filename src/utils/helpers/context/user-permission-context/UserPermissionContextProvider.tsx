import { useEffect, useState } from "react";
import { UserPermission } from "./UserPermissionContext";
import { GetPermissionResponse } from "../../../../services/project-services/Helper";
import sessionServices from "../../../../services/storage-services/SessionServices";

// Component to provide permission context
export const UserPermissionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // State to hold the permission data
  const [permission, setPermission] = useState<
    GetPermissionResponse["data"] | null
  >(null);

  // useEffect to handle permission state changes and sessionStorage
  useEffect(() => {
    // If permission is not null, store it in sessionStorage
    if (permission !== null) {
      sessionServices.setProjectPermission(permission);
    }

    // If permission is null, retrieve it from sessionStorage
    if (permission === null) {
      const currentPermission = sessionServices.getProjectPermission();
      if (currentPermission) {
        setPermission(currentPermission);
      }
    }
  }, [permission]);

  // Provide the permission context to the children
  return (
    <UserPermission.Provider value={{ permission, setPermission }}>
      {children}
    </UserPermission.Provider>
  );
};
