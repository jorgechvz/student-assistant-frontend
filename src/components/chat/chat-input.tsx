import { memo, useState, useCallback } from "react";
import { Send, Loader2, AudioWaveform } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  isSending: boolean;
  onSendMessage: (message: string) => void;
}

export const ChatInput = memo(function ChatInput({
  isSending,
  onSendMessage,
}: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputValue.trim() || isSending) return;

      onSendMessage(inputValue);
      setInputValue("");
    },
    [inputValue, isSending, onSendMessage],
  );

  return (
    <div className="flex-none p-4 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-t z-10 w-full">
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center bg-white rounded-full shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-purple-100 transition-all p-1"
        >
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 border-none shadow-none focus-visible:ring-0 py-6 bg-transparent text-base"
            autoComplete="off"
            disabled={isSending}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-gray-600 mr-2 rounded-full"
            disabled={isSending}
          >
            <AudioWaveform className="h-5 w-5" />
          </Button>
          <Button
            type="submit"
            size="icon"
            disabled={!inputValue.trim() || isSending}
            className="rounded-full bg-primary/60 hover:bg-primary/70 text-white mr-1 h-9 w-9 transition-colors disabled:opacity-50"
          >
            {isSending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-2">
          AI-generated content can be inaccurate. Double-check important info.
        </p>
      </div>
    </div>
  );
});
