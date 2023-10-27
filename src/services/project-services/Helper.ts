import { ManageTaskFormInput } from "../../components/form/manage-task/Helper";
import {
  ApiRequestWithPagination,
  ApiResponseWithPagination,
  NormalApiSuccessResponse,
} from "../Helper";

// Interface for individual project details
interface Project {
  id: number; // Project ID
  projectName: string; // Project name
  description: string; // Project description
  createdAt: string; // Project creation timestamp
  updatedAt: string; // Project last update timestamp
  closedAt: string | null; // Project closed timestamp (nullable)
}

interface ProjectWithTaskCount extends Project {
  status: { id: number; name: string }; // Project status details
  taskCount: number; // Count of tasks associated with the project
}
interface Task {
  id: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  closedAt: string | null;
  status: { id: number; name: string };
  tracker: { id: number; name: string };
}

// Interface for API requests with pagination and search
export interface ApiRequestWithPaginationAndSearch
  extends ApiRequestWithPagination {
  searchKey?: string; // Optional search key for filtering
}
export interface GetAllTasksRequest extends ApiRequestWithPaginationAndSearch {
  projectId: number;
  trackerId?: number;
  statusId?: number;
}

// Interface for the response from the server containing project data
export interface ProjectsResponse extends ApiResponseWithPagination {
  data: ProjectWithTaskCount[]; // Array of project data
}

// Interface for the response from the server containing task data
export interface TaskResponse extends ApiResponseWithPagination {
  data: Task[]; // Array of project data
}

// Interface for the response containing a new access token
export interface NewTokenResponse {
  accessToken: string; // New access token
}

export interface GetProjectByIdResponse extends NormalApiSuccessResponse {
  data: Project;
}
export interface GetTaskByIdResponse {
  success: boolean;
  message: string;
  data: Task;
}

export interface ManageTaskRequest extends ManageTaskFormInput {
  projectId: number;
}
// Comments provide explanations for each interface, making the code more readable and understandable.
