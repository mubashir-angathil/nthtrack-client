// Importing the TaskResponse type from the project services helper
import { TaskResponse } from "../../../services/project-services/Helper";

// Defining the props interface for TaskCardComponent
export interface TaskCardComponentProps {
  tasks: TaskResponse["data"]; // Array of project data from the API response
  handleTaskLoading: React.UIEventHandler<HTMLDivElement>; // Event handler for scrolling on project container
}
