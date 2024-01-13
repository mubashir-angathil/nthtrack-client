import {
  ApiRequestWithPagination,
  ApiResponseWithPagination,
  NormalApiSuccessResponse,
} from "../Helper";
import { ByUserDetails } from "../project-services/Helper";

export interface UerProfileResponse extends NormalApiSuccessResponse {
  data: ByUserDetails & {
    createdAt: string;
    totalProjects: number;
    totalContributedProjects: number;
  };
}

export interface UpdateProfileDetails {
  userId: number;
  username?: string;
}

export interface NotificationInterface {
  id: number;
  content: string;
  type: "General" | "Mention" | "Invite";
  author: ByUserDetails;
  createdAt: string;
  projectId: null | number;
  readersIds: number[];
}

export interface GetNotificationRequest extends ApiRequestWithPagination {
  type?: "Invite" | "Mention";
}
export interface GetNotificationResponse extends ApiResponseWithPagination {
  data: NotificationInterface[];
}

export interface MarkNotificationsAsReadRequest {
  notificationId: number[] | number;
}
