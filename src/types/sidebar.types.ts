export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: Date;
}

export interface Message {
  id: string;
  role: Sender;
  content: string;
  isToolOutput?: boolean;
  toolName?: string;
  toolData?: any;
  timestamp: Date;
}

export const Sender = {
  USER: "user",
  AI: "model",
  SYSTEM: "system",
} as const;

export type Sender = (typeof Sender)[keyof typeof Sender];
