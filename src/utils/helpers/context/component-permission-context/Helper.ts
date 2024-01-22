import React from "react";
import { PermissionJSONType } from "../../constants/Constants";

// Define the SettingsComponentPermissionProps interface
export interface ComponentPermissionContextProps {
  componentPermission: PermissionJSONType;
  setComponentPermission: React.Dispatch<
    React.SetStateAction<PermissionJSONType>
  >;
}
