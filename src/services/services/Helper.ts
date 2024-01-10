import { NormalApiSuccessResponse } from "../Helper";
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
