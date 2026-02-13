import { useEffect, useRef, useState, useCallback } from "react";
import { Bot } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@/hooks/use-chat";
import { ChatInput } from "./chat-input";
import { ChatMessageItem } from "./chat-message-item";
import { ChatContentSkeleton } from "@/components/loaders/chat-skeleton";

interface ChatInterfaceProps {
  sessionId?: string;
}

export function ChatInterface({ sessionId }: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  const {
    messages,
    isSending,
    error,
    sendMessage,
    clearError,
    isLoadingHistory,
  } = useChat(sessionId);

  useEffect(() => {
    if (autoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [messages, autoScroll]);

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const isAtBottom =
      target.scrollHeight - target.scrollTop - target.clientHeight < 100;
    setAutoScroll(isAtBottom);
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(clearError, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleSendMessage = useCallback(
    async (message: string) => {
      if (!message.trim() || isSending) return;
      setAutoScroll(true);
      await sendMessage(message);
    },
    [isSending, sendMessage],
  );

  if (isLoadingHistory && sessionId) {
    return <ChatContentSkeleton />;
  }

  return (
    <div className="flex flex-col h-full w-full overflow-hidden relative">
      {error && (
        <div className="absolute top-0 left-0 right-0 z-20 bg-destructive/10 border-b border-destructive/20 px-4 py-2">
          <p className="text-sm text-destructive text-center">{error}</p>
        </div>
      )}

      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full w-full" onScroll={handleScroll}>
          <div className="flex flex-col gap-4 max-w-3xl mx-auto p-4 pb-10">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                <Bot className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">
                  Start a conversation by typing a message below.
                </p>
              </div>
            )}

            {messages.map((msg) => (
              <ChatMessageItem key={msg.id} message={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      <ChatInput isSending={isSending} onSendMessage={handleSendMessage} />
    </div>
  );
}
