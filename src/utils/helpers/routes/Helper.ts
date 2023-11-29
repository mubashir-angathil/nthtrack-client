/* eslint-disable no-unused-vars */
type keys =
  | "signIn"
  | "signUp"
  | "home"
  | "projects"
  | "tasks"
  | "team"
  | "projectMembers";
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
