import { memo } from "react";
import { Bot, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { MarkdownMessage } from "./markdown-message";
import type { ChatMessage } from "@/types/chat.types";

interface ChatMessageItemProps {
  message: ChatMessage;
}

export const ChatMessageItem = memo(
  function ChatMessageItem({ message }: ChatMessageItemProps) {
    return (
      <div
        className={cn(
          "flex gap-x-3 mb-4",
          message.role === "user" ? "flex-row-reverse" : "flex-row",
        )}
      >
        {message.role === "assistant" && (
          <Avatar className="h-8 w-8 mt-1 shrink-0">
            <AvatarImage
              src="/src/assets/logoo.svg"
              alt="AI Loop assistant logo"
              className="w-7 mx-auto"
            />
            <AvatarFallback className="bg-purple-600 text-white">
              <Bot size={16} />
            </AvatarFallback>
          </Avatar>
        )}

        <div
          className={cn(
            "flex flex-col max-w-full rounded-2xl px-4 py-3",
            message.role === "user"
              ? "bg-secondary text-gray-800 rounded-tr-sm"
              : "bg-gray-50 text-gray-800 rounded-tl-sm",
          )}
        >
          {message.isLoading && message.content === "" ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-muted-foreground">Thinking...</span>
            </div>
          ) : message.role === "assistant" ? (
            <>
              <MarkdownMessage content={message.content} />
              {message.isLoading && (
                <span className="inline-block w-2 h-4 bg-gray-400 animate-pulse ml-1" />
              )}
            </>
          ) : (
            <span className="leading-relaxed whitespace-pre-wrap">
              {message.content}
            </span>
          )}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.message.id === nextProps.message.id &&
      prevProps.message.content === nextProps.message.content &&
      prevProps.message.isLoading === nextProps.message.isLoading
    );
  },
);
