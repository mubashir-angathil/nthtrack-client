import { ApiResponseWithPagination, NormalApiSuccessResponse } from "../Helper";
import { ByUserDetails } from "../project-services/Helper";

export interface SelectFieldApiResponse extends NormalApiSuccessResponse {
  data: Array<{ id: number; name: string }>;
}

export interface Teams extends NormalApiSuccessResponse {
  data: Array<{ id: number; team: string }>;
}

export interface GetProjectMemberRequest {
  projectId: number;
}

export interface GetProjectMemberResponse extends NormalApiSuccessResponse {
  data: Array<{ id: number; email: string; username: string }>;
}

export interface AutocompleteOptionType extends ByUserDetails {}
export interface AutocompleteResponse extends ApiResponseWithPagination {
  data: ByUserDetails[];
}
