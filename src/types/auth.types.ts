export interface UserResponse {
  id: string;
  email: string;
  full_name: string;
  is_active: boolean;
}

export interface LoginResponse {
  user: UserResponse;
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface SignUpResponse {
  user: UserResponse;
  access_token: string;
  refresh_token: string;
  token_type: string;
}
