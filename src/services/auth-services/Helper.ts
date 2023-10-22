export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  fieldErrors?: Array<{ [key: string]: unknown }>;
  authDetails: {
    id: number;
    username: string;
    accessToken: string;
    refreshToken: string;
  };
}

export interface NewTokenResponse {
  success: boolean;
  message: string;
  accessToken: string;
}
