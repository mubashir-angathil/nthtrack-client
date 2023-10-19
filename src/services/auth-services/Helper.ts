export interface AuthRequest {
  user: {
    username: string;
    password: string;
  };
}

export interface AuthResponse {
  message: string;
  user: {
    id: number;
    username: string;
  };
  accessToken: string;
  refreshToken: string;
}

export interface NewTokenResponse {
  accessToken: string;
}
