import { NormalApiSuccessResponse } from "../Helper";

export interface SelectFieldApiResponse extends NormalApiSuccessResponse {
  data: Array<{ id: number; name: string }>;
}

export interface Teams extends NormalApiSuccessResponse {
  data: Array<{ id: number; team: string }>;
}
