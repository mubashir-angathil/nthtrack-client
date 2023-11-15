import { ApiRequestWithPaginationAndSearch } from "../../services/project-services/Helper";

// Define the shape of the API configuration
export interface ApiConfig extends ApiRequestWithPaginationAndSearch {
  hasMore: boolean;
}

export const paginationAndSearchConfiguration: ApiConfig = {
  page: 1,
  limit: 4,
  hasMore: true,
  searchKey: undefined,
};
