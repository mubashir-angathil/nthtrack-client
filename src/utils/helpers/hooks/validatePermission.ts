import { PermissionJSONType } from "../../../pages/home/project/settings/Helper";

export const usePermissionHook = () => {
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

  const validatePermissionWithPermissionJSON = ({
    permission,
    permissionJSON,
  }: {
    permission: any;
    permissionJSON: PermissionJSONType;
  }) => {
    const updatedJSON: PermissionJSONType = {};

    Object.entries(permissionJSON).map(([key, value]) => {
      const isPermitted = validatePermissionWithPermissionString({
        permission,
        path: value.permission,
      });
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
