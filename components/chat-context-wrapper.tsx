"use client";

import { useState } from "react";
import { ChatContext, Chat } from "./contexts";

interface ChatContextProp {
  children: React.ReactNode;
  chatHistory: Chat[];
}

export function ChatContextWrapper({ children, chatHistory }: ChatContextProp) {
  const [chat, setChat] = useState<Chat[]>(chatHistory);
  return (
    <ChatContext.Provider value={{ chat, updateChat: setChat }}>
      {children}
    </ChatContext.Provider>
  );
}
