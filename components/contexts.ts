"use client";

import { createContext } from "react";

export interface ChatMessage {
  role: string;
  name: string;
  content: string;
}

export interface ChatSession {
  id: string;
  messages: Array<ChatMessage>;
  title: string | null;
}

export interface ChatContextType {
  chat: ChatSession[];
  updateChat: React.Dispatch<React.SetStateAction<ChatSession[]>>;
}

//TODO: add chat history for more readability
export const ChatContext = createContext<ChatContextType>({
  chat: [],
  updateChat: () => {},
});
