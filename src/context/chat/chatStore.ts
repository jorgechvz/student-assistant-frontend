import { create } from "zustand";
import type { CanvasConfig } from "@/types/chat.types";

interface ChatState {
  isSending: boolean;
  error: string | null;

  canvasConfig: CanvasConfig | null;
}

interface ChatActions {
  setIsSending: (isSending: boolean) => void;
  setError: (error: string | null) => void;
  setCanvasConfig: (config: CanvasConfig | null) => void;
  reset: () => void;
}

type ChatStore = ChatState & ChatActions;

const initialState: ChatState = {
  isSending: false,
  error: null,
  canvasConfig: null,
};

export const useChatStore = create<ChatStore>()((set) => ({
  ...initialState,

  setIsSending: (isSending) => set({ isSending }),
  setError: (error) => set({ error }),
  setCanvasConfig: (config) => set({ canvasConfig: config }),
  reset: () => set(initialState),
}));

export const selectIsSending = (state: ChatStore) => state.isSending;
export const selectError = (state: ChatStore) => state.error;
export const selectCanvasConfig = (state: ChatStore) => state.canvasConfig;
