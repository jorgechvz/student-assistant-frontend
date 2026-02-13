import { useCallback, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  sendMessageStream,
  getSessions,
  getSessionHistory,
  deleteSession,
} from "@/api/chat.api";
import type {
  SendMessageRequest,
  ChatMessage,
  SessionSummary,
  GetSessionsParams,
} from "@/types/chat.types";
import { useChatStore } from "@/context/chat";
import { Paths } from "@/router/path.routes";

export const chatKeys = {
  all: ["chat"] as const,
  sessions: (params?: GetSessionsParams) =>
    params
      ? ([...chatKeys.all, "sessions", params] as const)
      : ([...chatKeys.all, "sessions"] as const),
  sessionHistory: (sessionId: string) =>
    [...chatKeys.all, "history", sessionId] as const,
} as const;

export function useChatSessions(params: GetSessionsParams = {}) {
  return useQuery({
    queryKey: chatKeys.sessions(params),
    queryFn: async () => {
      const sessions = await getSessions(params);

      return sessions.sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return dateB - dateA;
      });
    },
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}
export function useSessionHistory(sessionId: string | undefined) {
  return useQuery({
    queryKey: chatKeys.sessionHistory(sessionId ?? ""),
    queryFn: async () => {
      if (!sessionId) return [];
      const history = await getSessionHistory({ session_id: sessionId });

      const messages: ChatMessage[] = history.map((msg, index) => ({
        id: `${sessionId}-${index}-${msg.created_at}`,
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content,
        timestamp: new Date(msg.created_at),
        metadata: msg.metadata,
      }));

      return messages;
    },
    enabled: !!sessionId,
    staleTime: 30000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { chatId } = useParams();
  const setIsSending = useChatStore((s) => s.setIsSending);
  const setError = useChatStore((s) => s.setError);
  const canvasConfig = useChatStore((s) => s.canvasConfig);
  const rafIdRef = useRef<number | null>(null);

  return useMutation({
    mutationFn: async (message: string) => {
      const request: SendMessageRequest = {
        message,
        session_id: chatId,
        canvas_token: canvasConfig?.token,
        canvas_base_url: canvasConfig?.base_url,
      };

      return new Promise<{ session_id: string; content: string }>(
        (resolve, reject) => {
          let fullContent = "";
          let realSessionId = chatId || "";
          const isNewSession = !chatId;
          let hasNavigated = false;
          let pendingFlush = false;

          const workingSessionId = chatId || `temp-${Date.now()}`;

          const previousMessages = queryClient.getQueryData<ChatMessage[]>(
            chatKeys.sessionHistory(workingSessionId),
          );

          const optimisticUserMessage: ChatMessage = {
            id: `temp-user-${Date.now()}`,
            role: "user",
            content: message,
            timestamp: new Date(),
          };

          const optimisticAssistantMessage: ChatMessage = {
            id: `temp-assistant-${Date.now()}`,
            role: "assistant",
            content: "",
            timestamp: new Date(),
            isLoading: true,
          };

          queryClient.setQueryData<ChatMessage[]>(
            chatKeys.sessionHistory(workingSessionId),
            [
              ...(previousMessages || []),
              optimisticUserMessage,
              optimisticAssistantMessage,
            ],
          );

          // Flush buffered content to query cache (batched via rAF)
          const flushContent = () => {
            pendingFlush = false;
            rafIdRef.current = null;

            const currentSessionId = realSessionId || workingSessionId;
            const messages = queryClient.getQueryData<ChatMessage[]>(
              chatKeys.sessionHistory(currentSessionId),
            );

            if (messages && messages.length > 0) {
              const lastMessage = messages[messages.length - 1];
              if (
                lastMessage.role === "assistant" &&
                lastMessage.content !== fullContent
              ) {
                const updatedMessages = [...messages];
                updatedMessages[updatedMessages.length - 1] = {
                  ...lastMessage,
                  content: fullContent,
                  isLoading: true,
                };
                queryClient.setQueryData(
                  chatKeys.sessionHistory(currentSessionId),
                  updatedMessages,
                );
              }
            }
          };

          const scheduleFlush = () => {
            if (!pendingFlush) {
              pendingFlush = true;
              rafIdRef.current = requestAnimationFrame(flushContent);
            }
          };

          sendMessageStream(
            request,
            (token) => {
              fullContent += token;
              scheduleFlush();
            },
            (sessionId) => {
              realSessionId = sessionId;

              if (isNewSession && !hasNavigated) {
                hasNavigated = true;

                const tempMessages = queryClient.getQueryData<ChatMessage[]>(
                  chatKeys.sessionHistory(workingSessionId),
                );

                if (tempMessages) {
                  queryClient.setQueryData(
                    chatKeys.sessionHistory(sessionId),
                    tempMessages,
                  );

                  navigate(`${Paths.app.CHAT}/${sessionId}`, { replace: true });

                  setTimeout(() => {
                    queryClient.removeQueries({
                      queryKey: chatKeys.sessionHistory(workingSessionId),
                    });
                  }, 100);
                }
              }
            },
            (sessionId) => {
              if (sessionId) {
                realSessionId = sessionId;
              }

              if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
                rafIdRef.current = null;
              }

              const messages = queryClient.getQueryData<ChatMessage[]>(
                chatKeys.sessionHistory(realSessionId),
              );

              if (messages && messages.length > 0) {
                const updatedMessages = [...messages];
                const lastMessage = updatedMessages[updatedMessages.length - 1];

                if (lastMessage.role === "assistant") {
                  updatedMessages[updatedMessages.length - 1] = {
                    ...lastMessage,
                    content: fullContent,
                    isLoading: false,
                  };

                  queryClient.setQueryData(
                    chatKeys.sessionHistory(realSessionId),
                    updatedMessages,
                  );
                }
              }

              resolve({ session_id: realSessionId, content: fullContent });
            },
          ).catch(reject);
        },
      );
    },
    onMutate: async () => {
      setIsSending(true);
      setError(null);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "chat" && query.queryKey[1] === "sessions",
        refetchType: "all",
      });
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to send message";
      setError(errorMessage);

      const currentPath = window.location.pathname;
      const tempSessionMatch = currentPath.match(/temp-\d+/);

      if (tempSessionMatch) {
        queryClient.removeQueries({
          queryKey: chatKeys.sessionHistory(tempSessionMatch[0]),
        });
        navigate(Paths.app.CHAT, { replace: true });
      }
    },
    onSettled: () => {
      setIsSending(false);
    },
  });
}

export function useDeleteSession() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { chatId } = useParams();

  return useMutation({
    mutationFn: async (sessionId: string) => {
      const result = await deleteSession(sessionId);
      return result;
    },
    onMutate: async (sessionId) => {
      await queryClient.cancelQueries({
        predicate: (query) =>
          query.queryKey[0] === "chat" && query.queryKey[1] === "sessions",
      });

      const queries = queryClient.getQueriesData<SessionSummary[]>({
        predicate: (query) =>
          query.queryKey[0] === "chat" && query.queryKey[1] === "sessions",
      });

      const previousData: Array<{
        queryKey: unknown[];
        data: SessionSummary[];
      }> = [];

      queries.forEach(([queryKey, data]) => {
        if (data) {
          previousData.push({ queryKey: queryKey as unknown[], data });

          const newSessions = data.filter((s) => s.session_id !== sessionId);

          queryClient.setQueryData(queryKey, newSessions);
        }
      });

      if (chatId === sessionId) {
        navigate(Paths.app.CHAT, { replace: true });
      }

      return { previousData };
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "chat" && query.queryKey[1] === "sessions",
        refetchType: "all",
      });

      await queryClient.refetchQueries({
        predicate: (query) =>
          query.queryKey[0] === "chat" && query.queryKey[1] === "sessions",
        type: "all",
      });
    },
    onError: (__, _, context) => {
      if (context?.previousData) {
        context.previousData.forEach(({ queryKey, data }) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
  });
}

export function useChat(sessionId?: string) {
  const isSending = useChatStore((s) => s.isSending);
  const error = useChatStore((s) => s.error);
  const setError = useChatStore((s) => s.setError);
  const historyQuery = useSessionHistory(sessionId);
  const sendMessageMutation = useSendMessage();

  const handleSendMessage = useCallback(
    async (message: string) => {
      if (!message.trim() || isSending) return;
      await sendMessageMutation.mutateAsync(message);
    },
    [isSending, sendMessageMutation],
  );

  return {
    messages: historyQuery.data ?? [],
    isSending,
    error,
    isLoadingHistory: historyQuery.isLoading,
    sendMessage: handleSendMessage,
    clearError: useCallback(() => setError(null), [setError]),
  };
}
