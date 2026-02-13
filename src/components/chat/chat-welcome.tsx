import { AudioWaveform, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSendMessage } from "@/hooks/use-chat";

interface ChatWelcomeProps {
  userName?: string;
}

const quickActions = [
  {
    tag: "STUDY PLAN",
    tagColor: "text-blue-700 bg-blue-100",
    bgColor: "bg-blue-50/50 hover:bg-blue-50",
    message: "Create a study schedule for my upcoming exams.",
  },
  {
    tag: "BRAINSTORMING",
    tagColor: "text-red-700 bg-red-100",
    bgColor: "bg-red-50/50 hover:bg-red-50",
    message: "Generate ideas for my History research paper.",
  },
  {
    tag: "WRITING",
    tagColor: "text-green-700 bg-green-100",
    bgColor: "bg-green-50/50 hover:bg-green-50",
    message: "Help me outline an essay about Cognitive Psychology.",
  },
];

export function ChatWelcome({ userName = "there" }: ChatWelcomeProps) {
  const [inputValue, setInputValue] = useState("");
  const { mutateAsync: sendMessage, isPending } = useSendMessage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim() || isPending) return;

    await sendMessage(inputValue);
    setInputValue("");
  };

  const handleQuickAction = async (message: string) => {
    if (isPending) return;
    await sendMessage(message);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 -mt-10">
      <div className="w-full max-w-3xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Hey, <span className="text-primary">{userName}</span>
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-300">
            How can I help you today?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.tag}
              type="button"
              onClick={() => handleQuickAction(action.message)}
              disabled={isPending}
              className={`p-4 ${action.bgColor} rounded-xl space-y-2 cursor-pointer transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <span
                className={`inline-block px-2 py-1 text-xs font-bold ${action.tagColor} rounded-md`}
              >
                {action.tag}
              </span>
              <p className="text-sm text-gray-600">{action.message}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="w-full max-w-3xl mt-12 md:mt-24">
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center bg-white rounded-full shadow-lg border border-gray-100 p-2"
        >
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything"
            className="flex-1 border-none shadow-none focus-visible:ring-0 text-base py-6 bg-transparent"
            autoComplete="off"
            disabled={isPending}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-gray-600 mr-2 rounded-full"
            disabled={isPending}
          >
            <AudioWaveform className="h-5 w-5" />
          </Button>

          <Button
            type="submit"
            size="icon"
            disabled={!inputValue.trim() || isPending}
            className="rounded-full bg-primary/60 hover:bg-primary/70 text-white mr-1 h-9 w-9 transition-colors"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-4">
          AI-generated content can be inaccurate. Double-check important info.
        </p>
      </div>
    </div>
  );
}
