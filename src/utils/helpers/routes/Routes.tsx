import { GoogleOAuthProvider } from "@react-oauth/google";
import PageHome from "../../../pages/home/PageHome";
import PageTaskView from "../../../pages/home/task/PageTaskView";
import PageProjects from "../../../pages/home/project/PageProjects";
import { PageAuthentication } from "../../../pages/public/authentication/PageAuthentication";
import { RouteConfigsType } from "./Helper";
import PageTeamProjects from "../../../pages/home/team/project/PageTeamProjects";
import PageManageProject from "../../../pages/home/project/manage-project/PageManageProject";
import PageManageTask from "../../../pages/home/task/manage-task/PageManageTask";
import PageProjectSettings from "../../../pages/home/project/settings/PageProjectSettings";
import PageProfile from "../../../pages/home/profile/PageProfile";
import PageNotification from "../../../pages/home/notification/PageNotification";
import { CLIENT_ID } from "../configs/Configs";
import PageViewProject from "../../../pages/home/project/view-project/PageViewProject";

// Define your routes using the RouteConfigsType
const routes: RouteConfigsType = {
  // Authentication Route
  authentication: {
    path: "/",
    element: (
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <PageAuthentication />
      </GoogleOAuthProvider>
    ), // React component to render
  },

  // Home Route
  home: {
    path: "/home",
    default: <PageHome />, // Default component for the route
    element: <PageProjects />, // React component to render
  },

  // Project Route
  projects: {
    path: "project/", // Dynamic parameter :id
    element: <PageViewProject />, // React component to render
    update: {
      path: "update",
      element: <PageManageProject type="update" />,
    },
    create: {
      path: "create",
      element: <PageManageProject type="create" />,
    },
  },

  // Task Route
  tasks: {
    path: "task/", // Dynamic parameter :id
    element: <PageTaskView />, // React component to render
    create: {
      path: "create",
      element: <PageManageTask type="create" />,
    },
    update: {
      path: "update",
      element: <PageManageTask type="update" />,
    },
  },

  team: {
    path: "",
    element: <PageTeamProjects />,
    create: {
      path: "create",
      element: <PageManageTask type="create" />,
    },
    update: {
      path: "update",
      element: <PageManageTask type="update" />,
    },
  },

  projectSettings: {
    path: "settings",
    element: <PageProjectSettings />,
  },

  profile: {
    path: "profile",
    element: <PageProfile />,
  },
  notification: {
    path: "notification",
    element: <PageNotification />,
  },
};

export default routes;
