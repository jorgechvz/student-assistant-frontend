export interface UserProfileResponse {
  id: string;
  email: string;
  full_name: string;
  is_active: boolean;
  created_at: string;
  has_canvas: boolean;
  has_google: boolean;
  has_notion: boolean;
}

export interface UpdateProfileRequest {
  full_name?: string;
  email?: string;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

export interface DeleteAccountRequest {
  password: string;
}

export interface IntegrationStatusResponse {
  canvas: boolean;
  google: boolean;
  notion: boolean;
  canvas_user_name?: string | null;
  google_email?: string | null;
  notion_workspace_name?: string | null;
}
