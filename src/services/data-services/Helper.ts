import {
  ApiRequestWithPagination,
  ApiResponseWithPagination,
  NormalApiSuccessResponse,
} from "../Helper";
import { ByUserDetails } from "../project-services/Helper";

export interface SelectFieldInterface {
  id: number;
  name: string;
}
export interface SelectFieldApiResponse extends NormalApiSuccessResponse {
  data: SelectFieldInterface[];
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
export interface LabelAutocompleteOptionType {
  id: number;
  name: string;
  color: string;
}
export interface StatusAutocompleteOptionType
  extends LabelAutocompleteOptionType {}
export interface AutocompleteResponse extends ApiResponseWithPagination {
  data: ByUserDetails[];
}
export interface LabelAutocompleteResponse extends NormalApiSuccessResponse {
  data: LabelAutocompleteOptionType[];
}
export interface StatusAutocompleteResponse extends NormalApiSuccessResponse {
  data: LabelAutocompleteOptionType[];
}
export interface GetNotificationRequest extends ApiRequestWithPagination {
  roomIds: number[];
}
export interface GetNotificationResponse extends ApiResponseWithPagination {
  data: Array<{ id: number; message: string; createdAt: string }>;
}

export interface GetEnrolledProjectIdsResponse
  extends NormalApiSuccessResponse {
  data: number[];
}
