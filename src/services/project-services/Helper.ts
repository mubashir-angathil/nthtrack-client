import { ManageTaskFormInput } from "../../components/form/manage-task/Helper";
import {
  ApiRequestWithPagination,
  ApiResponseWithPagination,
  NormalApiSuccessResponse,
} from "../Helper";

export declare type ByUserDetails = {
  id: number;
  username: string;
  email: string;
};
// Interface for individual project details
interface Project {
  id: number; // Project ID
  name: string; // Project name
  description: string; // Project description
  createdAt: string; // Project creation timestamp
  updatedAt: string; // Project last update timestamp
  closedAt: string | null; // Project closed timestamp (nullable)
  createdByUser: ByUserDetails;
  updatedByUser: ByUserDetails;
  closedByUser: ByUserDetails;
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
  assignees: Array<ByUserDetails>;
  createdByUser: ByUserDetails;
  updatedByUser: ByUserDetails;
  closedByUser: ByUserDetails;
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

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  projectId: number;
}
export interface UpdateTaskRequest {
  trackerId?: number;
  description?: string; // optional
  taskId: number; // required
  projectId: number; //required
}

export interface TeamProjectsRequest extends ApiRequestWithPaginationAndSearch {
  teamId: number;
}

export interface AddNewMemberRequest {
  projectId: number;
  userId: number;
  permissionId: number;
}
export interface UpdateMemberRequest extends RemoveMemberRequest {
  permissionId: number;
}
export interface RemoveMemberRequest {
  projectId: number;
  userId: number;
  memberId: number;
}

export interface GetProjectMembersRequest extends ApiRequestWithPagination {
  projectId: number;
}

export interface GetProjectMembersResponse extends ApiResponseWithPagination {
  data: Array<{
    id: number;
    user: {
      id: number;
      email: string;
      username: string;
    };
    permission: {
      id: number;
      name: string;
    };
    createdAt: string;
    updatedAt: string;
  }>;
}
// Comments provide explanations for each interface, making the code more readable and understandable.
