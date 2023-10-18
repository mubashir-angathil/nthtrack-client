type keys = "signin" | "signup" | "home" | "projects" | "tasks";

export type RouteConfigsType = {
  // eslint-disable-next-line no-unused-vars
  [key in keys]: {
    path: string;
    element: React.ReactNode;
    default?: React.ReactNode;
  };
};
