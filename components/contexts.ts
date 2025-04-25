"use client";

import { createContext } from "react";

export interface Chat {
  role: string;
  content: string;
  name: string | null;
}
//TODO: change naming and sync it with the backend and database naming
export interface ChatContextType {
  chat: Chat[];
  updateChat: React.Dispatch<React.SetStateAction<Chat[]>>;
}
//TODO: add chat history for more readability
export const ChatContext = createContext<ChatContextType>({
  chat: [],
  updateChat: () => {},
});
