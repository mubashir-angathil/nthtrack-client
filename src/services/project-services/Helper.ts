// Interface for API requests with pagination and search
export interface ApiRequestWithPaginationAndSearch {
  page: number; // Page number for pagination
  limit: number; // Limit for the number of items per page
  searchKey?: string; // Optional search key for filtering
}

// Interface for individual project details
interface Project {
  id: number; // Project ID
  projectName: string; // Project name
  description: string; // Project description
  status: { id: number; name: string }; // Project status details
  taskCount: number; // Count of tasks associated with the project
  createdAt: string; // Project creation timestamp
  updatedAt: string; // Project last update timestamp
  closedAt: string | null; // Project closed timestamp (nullable)
}

// Interface for the response from the server containing project data
export interface ProjectResponse {
  success: boolean; // Indicates the success of the API request
  message: string; // Message from the server
  totalRows: number; // Total number of rows/projects available
  data: Project[]; // Array of project data
}

// Interface for the response containing a new access token
export interface NewTokenResponse {
  accessToken: string; // New access token
}

// Comments provide explanations for each interface, making the code more readable and understandable.
