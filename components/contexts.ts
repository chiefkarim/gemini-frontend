"use client";

import { createContext } from "react";

export interface Chat {
  role: "assistant" | "user";
  content: string;
  name?: string;
}

export interface ChatType {
  chat: Chat[];
  updateChat: React.Dispatch<React.SetStateAction<Chat[]>>;
}

export const ChatContext = createContext<ChatType>({
  chat: [],
  updateChat: () => {},
});
