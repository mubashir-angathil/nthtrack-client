import { PermissionJSONType } from "../../../pages/home/project/settings/Helper";

export const usePermissionHook = () => {
  // Function to validate permission using a dot-separated path
  const validatePermissionWithPermissionString = ({
    permission,
    path,
  }: {
    permission: any;
    path: string;
  }) => {
    const keys = path.split(".");
    let current = permission;

    for (const key of keys) {
      if (!current[key]) {
        return false;
      }

      current = current[key];
    }

    return current;
  };

  // Function to validate permission using a PermissionJSONType object
  const validatePermissionWithPermissionJSON = ({
    permission,
    permissionJSON,
  }: {
    permission: any;
    permissionJSON: PermissionJSONType;
  }) => {
    // Updated JSON object to store permission status
    const updatedJSON: PermissionJSONType = {};

    // Iterate through the entries of permissionJSON and validate permissions
    Object.entries(permissionJSON).map(([key, value]) => {
      const isPermitted = validatePermissionWithPermissionString({
        permission,
        path: value.permission,
      });

      // Store the permission status in the updatedJSON object
      return (updatedJSON[key] = {
        permission: value.permission,
        permitted: isPermitted,
      });
    });

    return updatedJSON;
  };

  return {
    validatePermissionWithPermissionString,
    validatePermissionWithPermissionJSON,
  };
};
