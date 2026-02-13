import { axiosClient } from "./axios-client";
import type {
  SendMessageRequest,
  ChatMessageResponse,
  SessionSummary,
  MessageHistory,
  DeleteSessionResponse,
  GetSessionsParams,
  GetSessionHistoryParams,
} from "@/types/chat.types";

const CHAT_ENDPOINTS = {
  MESSAGE: "/chat/message",
  MESSAGE_STREAM: "/chat/message/stream",
  SESSIONS: "/chat/sessions",
  SESSION_HISTORY: (sessionId: string) => `/chat/sessions/${sessionId}/history`,
  DELETE_SESSION: (sessionId: string) => `/chat/sessions/${sessionId}`,
} as const;

export async function sendMessage(
  request: SendMessageRequest,
): Promise<ChatMessageResponse> {
  const { data } = await axiosClient.post<ChatMessageResponse>(
    CHAT_ENDPOINTS.MESSAGE,
    request,
  );
  return data;
}

export async function getSessions(
  params: GetSessionsParams = {},
): Promise<SessionSummary[]> {
  const { limit = 20, active_only = true } = params;

  const { data } = await axiosClient.get(
    CHAT_ENDPOINTS.SESSIONS,
    {
      params: { limit, active_only },
    },
  );

  // Handle both array response and wrapped object response
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.sessions)) return data.sessions;
  if (data && Array.isArray(data.data)) return data.data;
  return [];
}

export async function getSessionHistory(
  params: GetSessionHistoryParams,
): Promise<MessageHistory[]> {
  const { session_id, limit = 100 } = params;

  const { data } = await axiosClient.get<MessageHistory[]>(
    CHAT_ENDPOINTS.SESSION_HISTORY(session_id),
    {
      params: { limit },
    },
  );
  return data;
}

export async function deleteSession(
  sessionId: string,
): Promise<DeleteSessionResponse> {
  const { data } = await axiosClient.delete<DeleteSessionResponse>(
    CHAT_ENDPOINTS.DELETE_SESSION(sessionId),
  );
  return data;
}

export async function sendMessageStream(
  request: SendMessageRequest,
  onToken: (token: string) => void,
  onSessionId: (sessionId: string) => void,
  onComplete: (sessionId: string) => void,
): Promise<void> {
  const response = await fetch(
    `${axiosClient.defaults.baseURL}${CHAT_ENDPOINTS.MESSAGE_STREAM}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      credentials: "include",
      body: JSON.stringify(request),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Stream error response:", errorText);
    throw new Error(
      `HTTP error! status: ${response.status}, details: ${errorText}`,
    );
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  if (!reader) {
    throw new Error("No reader available");
  }

  let sessionId = request.session_id || "";

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);

          if (data.trim()) {
            try {
              const parsed = JSON.parse(data);

              if (parsed.type === "metadata" && parsed.session_id) {
                sessionId = parsed.session_id;
                onSessionId(sessionId);
              }

              if (parsed.type === "token" && parsed.token !== undefined) {
                onToken(parsed.token);
              }

              if (parsed.type === "done" && parsed.done) {
                if (parsed.session_id) {
                  sessionId = parsed.session_id;
                }
                onComplete(sessionId);
                return;
              }
            } catch (e) {
              console.error("Failed to parse SSE data:", e);
            }
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}
