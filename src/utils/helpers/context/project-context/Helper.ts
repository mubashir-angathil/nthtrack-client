import React from "react";
import { Project } from "../../../../services/project-services/Helper";

// Define the ProjectContextProps interface
export interface ProjectContextProps {
  // The current project or null if none is set
  project: Project | null;

  // Function to update the current project
  setProject: React.Dispatch<React.SetStateAction<Project | null>>;
}
