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
export interface Project {
  id: number; // Project ID
  name: string; // Project name
  description: string; // Project description
  createdAt: string; // Project creation timestamp
  updatedAt: string; // Project last update timestamp
  closedAt: string | null; // Project closed timestamp (nullable)
  createdByUser: ByUserDetails;
  updatedByUser: ByUserDetails;
  closedByUser: ByUserDetails;
  statuses: Array<{ id: number; name: string; color: string }>;
}

interface ProjectWithTaskCount extends Project {
  taskCount: number; // Count of tasks associated with the project
}
interface Task {
  id: number;
  task: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  closedAt: string | null;
  status: { id: number; name: string; color: string };
  label: { id: number; name: string; color: string };
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
export interface ApiRequestWithPaginationParamsAndSearch
  extends ApiRequestWithPagination {
  searchKey?: string; // Optional search key for filtering
  projectId: number;
}

export interface GetAllTasksRequest {
  projectId: number;
  labelId?: number;
  searchKey?: string;
}

// Interface for the response from the server containing project data
export interface ProjectsResponse extends ApiResponseWithPagination {
  data: ProjectWithTaskCount[]; // Array of project data
}

// Interface for the response from the server containing task data
export interface TaskResponse extends ApiResponseWithPagination {
  data: {
    [key: string]: Task[];
  };
}

export interface UpdatedTaskResponse extends NormalApiSuccessResponse {
  data: Task;
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
  statusId: number;
}

export interface ManageTaskResponse extends ApiResponseWithPagination {
  data: Task; // task data
}
export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  projectId: number;
}
export interface UpdateTaskRequest {
  labelId?: number;
  statusId?: number;
  description?: string; // optional
  taskId: number; // required
  task?: string;
  assignees?: string[];
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
export interface MarkNotificationsAsReadRequest {
  notificationIds: number[];
}

export interface StatusInterface {
  id: number;
  name: string;
  color: string;
}
export interface CreateStatusResponse extends NormalApiSuccessResponse {
  data: StatusInterface;
}
export interface CreateStatusRequest {
  name: string;
  color: string;
  projectId: number;
}
export interface CreateLabelRequest extends CreateStatusRequest {}

export interface CreateLabelResponse extends CreateStatusResponse {}

export interface UpdateStatusRequest {
  name?: string;
  color?: string;
  projectId: number;
  statusId: number;
}

export interface UpdateLabelRequest {
  name?: string;
  color?: string;
  projectId: number;
  labelId: string;
}
// Comments provide explanations for each interface, making the code more readable and understandable.
