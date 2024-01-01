export interface AuthRequest {
  usernameOrEmail: string;
  password: string;
}
export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  fieldErrors?: Array<{ [key: string]: unknown }>;
  data: {
    id: number;
    username: string;
    email: string;
    accessToken: string;
    refreshToken: string;
  };
}

export interface NewTokenResponse {
  success: boolean;
  message: string;
  accessToken: string;
}
