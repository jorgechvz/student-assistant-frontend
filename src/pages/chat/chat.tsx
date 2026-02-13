import { useParams } from "react-router-dom";
import Layout from "@/components/chat/layout";
import { ChatWelcome } from "@/components/chat/chat-welcome";
import { ChatInterface } from "@/components/chat/chat-interface";
import { useAuthStore } from "@/context/auth/userStore";
import { useChatSessions } from "@/hooks/use-chat";

export const ChatPage = () => {
  const { chatId } = useParams();
  const { user } = useAuthStore();
  const { data: sessions } = useChatSessions();

  const showWelcome = !chatId;

  const currentSession = sessions?.find(
    (session) => session.session_id === chatId,
  );

  const pageTitle = showWelcome
    ? "Loop Chat"
    : currentSession?.title || "Loop Chat";

  return (
    <>
      <title>{pageTitle}</title>
      <meta
        name="description"
        content={
          showWelcome
            ? "Start a new conversation with your AI assistant"
            : `Chat: ${currentSession?.title || "Conversation"}`
        }
      />
      <Layout>
        {showWelcome ? (
          <ChatWelcome userName={user?.full_name?.split(" ")[0] ?? "there"} />
        ) : (
          <ChatInterface sessionId={chatId} />
        )}
      </Layout>
    </>
  );
};
