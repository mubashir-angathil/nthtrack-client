import PageHome from "../../../pages/home/PageHome";
import PageTaskView from "../../../pages/home/issue/PageIssueView";
import PageProjects from "../../../pages/home/project/PageProjects";
import PageViewProject from "../../../pages/home/project/view-project/PageViewProject";
import PageSignIn from "../../../pages/public/sign-in/PageSignIn";
import PageSignUp from "../../../pages/public/sign-up/PageSignUp";
import { RouteConfigsType } from "./Helper";

// Define your routes using the RouteConfigsType
const routes: RouteConfigsType = {
  // Sign In Route
  signIn: {
    path: "/",
    element: <PageSignIn />, // React component to render
  },

  // Sign Up Route
  signUp: {
    path: "/sign-up",
    element: <PageSignUp />, // React component to render
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
  },

  // Task Route
  tasks: {
    path: "task/", // Dynamic parameter :id
    element: <PageTaskView />, // React component to render
  },
};

export default routes;
