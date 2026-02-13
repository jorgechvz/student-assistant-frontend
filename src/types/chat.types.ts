export interface StreamToken {
  token?: string;
  done?: boolean;
}

export interface SendMessageRequest {
  message: string;
  session_id?: string;
  canvas_token?: string;
  canvas_base_url?: string;
}

export interface ChatSession {
  session_id: string;
  title: string;
  messages: ChatMessage[];
  created_at?: Date;
  updated_at?: Date;
}

export interface GetSessionsParams {
  limit?: number;
  active_only?: boolean;
}

export interface GetSessionHistoryParams {
  session_id: string;
  limit?: number;
}

export interface ChatMessageResponse {
  session_id: string;
  message: string;
  tools_available: number;
  metadata: Record<string, unknown>;
}

export interface SessionSummary {
  session_id: string;
  title: string;
  message_count: number;
  last_message_at: string | null;
  created_at: string;
}

export interface MessageHistory {
  role: "user" | "assistant" | "system";
  content: string;
  created_at: string;
  metadata: Record<string, unknown>;
}

export interface DeleteSessionResponse {
  message: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isLoading?: boolean;
  metadata?: Record<string, unknown>;
}

export interface ActiveSession {
  session_id: string;
  title: string;
  messages: ChatMessage[];
}

export interface CanvasConfig {
  token: string;
  base_url: string;
}
