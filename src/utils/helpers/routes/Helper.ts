/* eslint-disable no-unused-vars */
type keys =
  | "authentication"
  | "home"
  | "projects"
  | "tasks"
  | "team"
  | "profile"
  | "notification"
  | "projectSettings";
type actions = "create" | "update" | "view";

export type RouteConfigsType = {
  [key in keys]: {
    path: string;
    element: React.ReactNode;
    default?: React.ReactNode;
  } & {
    [action in actions]?: {
      path: string;
      element: React.ReactNode;
      default?: React.ReactNode;
    };
  };
};
