import { createContext, useContext } from "react";
import { ProjectContextProps } from "./Helper";

// Create a project context with default values
export const ProjectContext = createContext<ProjectContextProps>({
  project: null,
  setProject: () => {},
});

// Custom hook to use the project context
export const useProjectContext = () => {
  // Access the project context
  const projectContext = useContext(ProjectContext);

  // Throw an error if the hook is not used within a ProjectContextProvider
  if (!projectContext) {
    throw new Error(
      "useProjectContext must be used within a ProjectContextProvider",
    );
  }

  return projectContext;
};
