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
//TODO: update typing
export interface UpdateCurrentChat {
  value: any;
  sessionIndex: number;
  messageIndex?: number | "last";
}
export interface ChatContextType {
  chat: ChatSession[];
  //TODO: update to current session
  currentChat: number;
  setCurrentChat: React.Dispatch<React.SetStateAction<number>>;
  updateChat: React.Dispatch<React.SetStateAction<ChatSession[]>>;
  updateCurrentChat: ({
    value,
    sessionIndex,
    messageIndex,
  }: UpdateCurrentChat) => void;
}

//TODO: add chat history for more readability
export const ChatContext = createContext<ChatContextType>({
  chat: [],
  currentChat: 0,
  setCurrentChat: () => {},
  updateChat: () => {},
  updateCurrentChat: () => {},
});
