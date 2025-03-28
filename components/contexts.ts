"use client";

import { createContext } from "react";

export interface Chat {
  role: "assistant" | "user";
  content: string;
  name?: string;
}

//TODO: update naming to chathistory

export interface ChatType {
  chat: Chat[];
  updateChat: React.Dispatch<React.SetStateAction<Chat[]>>;
  retry: boolean;
  setRetry: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChatContext = createContext<ChatType>({
  chat: [],
  updateChat: () => {},
  retry: false,
  setRetry: () => {},
});
