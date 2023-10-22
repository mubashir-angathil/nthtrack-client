// Importing the ProjectResponse type from the project services helper
import { ProjectResponse } from "../../../services/project-services/Helper";

// Defining the props interface for ProjectCardComponent
export interface ProjectCardComponentProps {
  projects: ProjectResponse["data"]; // Array of project data from the API response
  handleProjectLoading: React.UIEventHandler<HTMLDivElement>; // Event handler for scrolling on project container
}
